import { Repository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { Store } from "../entity/store";
import { StoreIngredient } from "../entity/storeIngredient";
import { Unit } from "../entity/unit";

export class IngredientController {

    ingredientRepo: Repository<Ingredient>;
    unitRepo: Repository<Unit>;
    storeIngredientRepo: Repository<StoreIngredient>;

    constructor(ingredientRepository: Repository<Ingredient>, unitRepository: Repository<Unit>, storeIngredientRepository: Repository<StoreIngredient>){
        this.ingredientRepo = ingredientRepository;
        this.unitRepo = unitRepository;
        this.storeIngredientRepo = storeIngredientRepository;
    }

    async InsertIngredient(ingredientToAdd: Ingredient, storeAmounts: [Store, number][]){
        let foundIngredient = await this.ingredientRepo.findOne({name: ingredientToAdd.name});
        if (foundIngredient != undefined){
            throw "Ingredient already exists";
        }

        let unit = await this.unitRepo.findOne({name: ingredientToAdd.unit.name})
        if (unit){
            ingredientToAdd.unit.id = unit.id;
        }

        let ingredient = await this.ingredientRepo.save(ingredientToAdd);

        for (const storeAmount of storeAmounts) {
            let storeIngredient = new StoreIngredient();
            storeIngredient.ingredientId = ingredient.id;
            storeIngredient.storeId = storeAmount[0].id;
            storeIngredient.quantity = storeAmount[1];

            await this.storeIngredientRepo.save(storeIngredient);
        }
    }
}
