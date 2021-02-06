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
        console.log("Adding recipe " + recipeToAdd);
        let recipe = await this.recipeRepo.save(recipeToAdd);
        console.log("Recipe added " + recipe);
        
        for (let index = 0; index < recipeIngredients.length; index++) {
            console.log("Adding ingredient " + recipeIngredients[index]);
            let ingredient = await this.ingredientRepo.save(recipeIngredients[index]);
            console.log("Ingredient added " + ingredient);
            
            let recipeIngredient = new RecipeIngredient();
            recipeIngredient.ingredientId = ingredient.id;
            recipeIngredient.recipeId = recipe.id;
            recipeIngredient.quantity = quantities[index];
            recipeIngredient.unitId = unitIds[index];
            
            var propValue;
                for(var propName in recipeIngredient) {
                    propValue = recipeIngredient[propName]

                    console.log(propName,propValue);
}

            await this.recipeIngredientRepo.save(recipeToAdd);
            console.log("Added recipe ingredient " + recipeIngredient);
        }
    }
}