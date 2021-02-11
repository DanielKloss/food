import { Request, Response } from "express";
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

    async InsertRecipe(recipeToAdd: Recipe, recipeIngredients: Ingredient[], quantities: number[]){
        let recipe = await this.recipeRepo.findOne({name: recipeToAdd.name});
        if (recipe != undefined){
            throw "Recipe already exists";
        }
        
        for (const tag of recipeToAdd.tag) {
            let foundTag = await this.tagRepo.findOne({name: tag.name});
            if (foundTag){
                tag.id = foundTag.id;
            }
        }

        for (const instruction of recipeToAdd.instruction) {
            let foundInstruction = await this.instructionRepo.findOne({description: instruction.description});
            if (foundInstruction) {
                instruction.id = foundInstruction.id;
            }
        }

        await this.recipeRepo.save(recipeToAdd);

        for (let i = 0; i < recipeIngredients.length; i++) {
            let ingredient = await this.ingredientRepo.findOne({name: recipeIngredients[i].name})
            if (ingredient == undefined){
                let unit = await this.unitRepo.findOne({name: recipeIngredients[i].unit.name})
                if (unit){
                    recipeIngredients[i].unit.id = unit.id;
                }
                ingredient = await this.ingredientRepo.save(recipeIngredients[i]);
            }
            
            let recipeIngredient = new RecipeIngredient();
            recipeIngredient.ingredientId = ingredient.id;
            recipeIngredient.recipeId = recipeToAdd.id;
            recipeIngredient.quantity = quantities[i];
                                
            await this.recipeIngredientRepo.save(recipeIngredient);
        }
    }

    static GetAllRecipes = async (request: Request, response: Response) => {
        let recipeRepo = getRepository(Recipe);
        let recipes = await recipeRepo.find();
        response.send(recipes);
    }

    static GetRecipeIngredientsAndInstructionsByName = async (request: Request, response: Response) => {
        console.log(request.body);
        console.log(request.body.name);
        let recipe = await createQueryBuilder<Recipe>("Recipe")
            .innerJoinAndSelect("Recipe.recipeIngredient", "recipeIngredient")
            .innerJoinAndSelect("recipeIngredient.ingredient", "ingredient")
            .innerJoinAndSelect("ingredient.unit", "unit")
            .innerJoinAndSelect("Recipe.instruction", "instruction")
            .where("Recipe.name = :name", {name: request.body.recipeName})
            .getOne();
        console.log(recipe);
        response.send(recipe);
    }

    async GetRecipesByTag(tagName: string){
        return await createQueryBuilder<Recipe>("Recipe")
            .innerJoinAndSelect("Recipe.tag", "tag")
            .where("tag.name = :name", {name: tagName})
            .getMany();
    }

    async GetRecipesByIngredient(ingredientName: string){
        return await createQueryBuilder<Recipe>("Recipe")
        .innerJoinAndSelect("Recipe.recipeIngredient", "recipeIngredient")
        .innerJoinAndSelect("recipeIngredient.ingredient", "ingredient")
        .where("ingredient.name = :name", {name: ingredientName})
        .getMany();
    }
}