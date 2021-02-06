import { Repository } from "typeorm";
import { Recipe } from "../entity/recipe";

export class RecipeController {

    repository: Repository<Recipe>;

    constructor(repository: Repository<Recipe>){
        this.repository = repository;
    }

    async InsertRecipes(recipesToAdd: Recipe[]){
        await this.repository.save(recipesToAdd);
    }
}