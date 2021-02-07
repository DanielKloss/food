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
        recipeToAdd.id = await this.recipeRepo.getId(recipeToAdd);
        console.log("Found id! " + recipeToAdd.id);
        console.log("Adding recipe " + recipeToAdd.name);
        let recipe = await this.recipeRepo.save(recipeToAdd);
        console.log("Recipe added " + recipe.name);
        
        for (let i = 0; i < recipeIngredients.length; i++) {
            console.log("Adding ingredient " + recipeIngredients[i].name);
            await this.ingredientRepo.save(recipeIngredients[i]).then(async ingredient => {
                console.log("Ingredient added " + ingredient.name);

                let recipeIngredient = new RecipeIngredient();
                recipeIngredient.ingredient = ingredient;
                recipeIngredient.recipe = recipeToAdd;
                recipeIngredient.quantity = quantities[i];
                recipeIngredient.unitId = unitIds[i];
                console.log("Created recipe ingredient " + recipeIngredient.ingredient.name);
    
                await this.recipeIngredientRepo.save(recipeIngredient).then(recipeIngredient => {
                    console.log("Added recipe ingredient " + recipeIngredient.quantity);
                });
            });
        }
    }
}