import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { Instruction } from "../entity/instruction";
import { Recipe } from "../entity/recipe";
import { RecipeIngredient } from "../entity/recipeIngredient";
import { Tag } from "../entity/tag";
import { Unit } from "../entity/unit";

export class RecipeController {

    static async GetAllRecipes(request: Request, response: Response){
        response.send(
            await createQueryBuilder<Recipe>("Recipe")
            .innerJoinAndSelect("Recipe.recipeIngredient", "recipeIngredient")
            .innerJoinAndSelect("recipeIngredient.ingredient", "ingredient")
            .innerJoinAndSelect("ingredient.unit", "unit")
            .innerJoinAndSelect("Recipe.instruction", "instruction")
            .innerJoinAndSelect("Recipe.tag", "tag")
            .orderBy("Recipe.name")
            .getMany()
        );
    }

    static async GetRecipeIngredientsAndInstructionsByName (request: Request, response: Response){
        response.send(
            await createQueryBuilder<Recipe>("Recipe")
            .innerJoinAndSelect("Recipe.recipeIngredient", "recipeIngredient")
            .innerJoinAndSelect("recipeIngredient.ingredient", "ingredient")
            .innerJoinAndSelect("ingredient.unit", "unit")
            .innerJoinAndSelect("Recipe.instruction", "instruction")
            .where("Recipe.name = :name", {name: request.body.recipeName})
            .getOne()
        );
    }

    static async GetRecipesByTag(request: Request, response:Response){
        response.send(
            await createQueryBuilder<Recipe>("Recipe")
            .innerJoinAndSelect("Recipe.tag", "tag")
            .where("tag.name = :name", {name: request.body.tagName})
            .getMany()
        );
    }

    static async GetRecipesByIngredient(request: Request, response:Response){
        response.send(
            await createQueryBuilder<Recipe>("Recipe")
            .innerJoinAndSelect("Recipe.recipeIngredient", "recipeIngredient")
            .innerJoinAndSelect("recipeIngredient.ingredient", "ingredient")
            .where("ingredient.name = :name", {name: request.body.ingredientName})
            .getMany()
        );
    }

    static async InsertRecipe(request: Request, response: Response){
        console.log("Adding recipe!" + request.body);
        let recipeRepo = getRepository(Recipe);
        let tagRepo = getRepository(Tag);
        let instructionRepo = getRepository(Instruction);
        let ingredientRepo = getRepository(Ingredient);
        let unitRepo = getRepository(Unit);
        let recipeIngredientRepo = getRepository(RecipeIngredient);

        let recipe = await recipeRepo.findOne({name: request.body.name});
        if (recipe != undefined){
            throw "Recipe already exists";
        }
        
        for (const tag of request.body.tag) {
            let foundTag = await tagRepo.findOne({name: tag.name});
            if (foundTag){
                tag.id = foundTag.id;
            }
        }

        for (const instruction of request.body.instruction) {
            let foundInstruction = await instructionRepo.findOne({description: instruction.description});
            if (foundInstruction) {
                instruction.id = foundInstruction.id;
            }
        }

        await recipeRepo.save(request.body);

        for (let i = 0; i < request.body.recipeIngredients.length; i++) {
            let ingredient = await ingredientRepo.findOne({name: request.body.recipeIngredients[i].name})
            if (ingredient == undefined){
                let unit = await unitRepo.findOne({name: request.body.recipeIngredients[i].unit.name})
                if (unit){
                    request.body.recipeIngredients[i].unit.id = unit.id;
                }
                ingredient = await ingredientRepo.save(request.body.recipeIngredients[i]);
            }
            
            let recipeIngredient = new RecipeIngredient();
            recipeIngredient.ingredientId = ingredient.id;
            recipeIngredient.recipeId = request.body.id;
            recipeIngredient.quantity = request.body.quantities[i];
                                
            await recipeIngredientRepo.save(recipeIngredient);
        }

        response.status(200);
        response.send(request.body.recipe);
    }
}