import { Repository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { RecipeIngredient } from "../entity/recipeIngredient";

export class RecipeIngredientController {

    repository: Repository<RecipeIngredient>;

    constructor(repository: Repository<RecipeIngredient>){
        this.repository = repository;
    }

    async InsertRecipeIngredients(recipeIngredientsToAdd: RecipeIngredient[]){
        await this.repository.save(recipeIngredientsToAdd);
    }
}
