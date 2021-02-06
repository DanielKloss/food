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
        await this.recipeRepo.save(recipeToAdd);
        
        for (let index = 0; index < recipeIngredients.length; index++) {
            await this.ingredientRepo.save(recipeIngredients[index]);
            
            let recipeIngredient = new RecipeIngredient();
            recipeIngredient.ingredient = recipeIngredients[index];
            recipeIngredient.recipe = recipeToAdd;
            recipeIngredient.quantity = quantities[index];
            recipeIngredient.unitId = unitIds[index];

            await this.recipeIngredientRepo.save(recipeToAdd);
        }
    }
}