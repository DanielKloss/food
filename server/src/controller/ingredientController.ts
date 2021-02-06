import { Repository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";

export class IngredientController {

    repository: Repository<Ingredient>;

    constructor(repository: Repository<Ingredient>){
        this.repository = repository;
    }

    async InsertIngredients(ingredientsToAdd: Ingredient[]){
        await this.repository.save(ingredientsToAdd);
    }
}
