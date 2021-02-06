import { Console } from "console";
import { Repository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { Recipe } from "../entity/recipe";
import { RecipeIngredient } from "../entity/recipeIngredient";

export class RecipeController {

    recipeRepo: Repository<Recipe>;
    ingredientRepo: Repository<Ingredient>;
    recipeIngredientRepo: Repository<RecipeIngredient>;

    constructor(recipeRepository: Repository<Recipe>, ingredientRepository: Repository<Ingredient>, recipeIngredientRepository: Repository<RecipeIngredient>){
        this.recipeRepo = recipeRepository;
        this.ingredientRepo = ingredientRepository;
        this.recipeIngredientRepo = recipeIngredientRepository;
    }

    async InsertRecipe(recipeToAdd: Recipe, recipeIngredients: Ingredient[], quantities: number[], unitIds: number[]){
        console.log("Adding recipe " + recipeToAdd.name);
        let recipe = await this.recipeRepo.save(recipeToAdd);
        console.log("Recipe added " + recipe.name);
        
        for (let index = 0; index < recipeIngredients.length; index++) {
            console.log("Adding ingredient " + recipeIngredients[index].name);
            await this.ingredientRepo.save(recipeIngredients[index]).then(async ingredient => {
                console.log("Ingredient added " + ingredient.name);

                let recipeIngredient = new RecipeIngredient();
                recipeIngredient.ingredient = ingredient;
                recipeIngredient.recipe = recipeToAdd;
                recipeIngredient.quantity = quantities[index];
                recipeIngredient.unitId = unitIds[index];
                console.log("Created recipe ingredient " + recipeIngredient.quantity);
    
                await this.recipeIngredientRepo.save(recipeIngredient).then(recipeIngredient => {
                    console.log("Added recipe ingredient " + recipeIngredient.quantity);
                });
            });
        }
    }
}