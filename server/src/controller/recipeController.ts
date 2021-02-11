import { Request, response, Response } from "express";
import { request } from "http";
import { createQueryBuilder, getConnection, getManager, getRepository, Repository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { Instruction } from "../entity/instruction";
import { Recipe } from "../entity/recipe";
import { RecipeIngredient } from "../entity/recipeIngredient";
import { Tag } from "../entity/tag";
import { Unit } from "../entity/unit";

export class RecipeController {

    recipeRepo = getConnection().getRepository(Recipe);
    ingredientRepo = getConnection().getRepository(Ingredient);
    recipeIngredientRepo = getConnection().getRepository(RecipeIngredient);
    unitRepo = getConnection().getRepository(Unit);
    tagRepo = getConnection().getRepository(Tag);
    instructionRepo = getConnection().getRepository(Instruction);

    static async InsertRecipe(request: Request, response: Response){
        let recipeRepo = getRepository(Recipe);
        let tagRepo = getRepository(Tag);
        let instructionRepo = getRepository(Instruction);
        let ingredientRepo = getRepository(Ingredient);
        let unitRepo = getRepository(Unit);
        let recipeIngredientRepo = getRepository(RecipeIngredient);

        let recipe = await recipeRepo.findOne({name: request.body.recipeToAdd.name});
        if (recipe != undefined){
            throw "Recipe already exists";
        }
        
        for (const tag of request.body.recipeToAdd.tag) {
            let foundTag = await tagRepo.findOne({name: tag.name});
            if (foundTag){
                tag.id = foundTag.id;
            }
        }

        for (const instruction of request.body.recipeToAdd.instruction) {
            let foundInstruction = await instructionRepo.findOne({description: instruction.description});
            if (foundInstruction) {
                instruction.id = foundInstruction.id;
            }
        }

        await recipeRepo.save(request.body.recipeToAdd);

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
            recipeIngredient.recipeId = request.body.recipeToAdd.id;
            recipeIngredient.quantity = request.body.quantities[i];
                                
            await recipeIngredientRepo.save(recipeIngredient);
        }
    }

    static async GetAllRecipes(request: Request, response: Response){
        let recipeRepo = getRepository(Recipe);
        response.send(await recipeRepo.find());
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
}