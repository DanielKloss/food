import { Request, Response } from "express";
import { createQueryBuilder, getRepository, Repository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { Store } from "../entity/store";
import { StoreIngredient } from "../entity/storeIngredient";
import { Unit } from "../entity/unit";

export class IngredientController {

    static async InsertIngredient(request: Request, response: Response){
        let ingredientRepo = getRepository(Ingredient);
        let unitRepo = getRepository(Unit);
        let storeIngredientRepo = getRepository(StoreIngredient);

        let foundIngredient = await ingredientRepo.findOne({name: request.body.ingredient.name});
        if (foundIngredient != undefined){
            throw "Ingredient already exists";
        }

        let unit = await unitRepo.findOne({name: request.body.ingredient.unit.name})
        if (unit){
            request.body.ingredient.unit.id = unit.id;
        }

        let ingredient = await ingredientRepo.save(request.body.ingredient);

        for (const storeAmount of request.body.storeAmounts) {
            let storeIngredient = new StoreIngredient();
            storeIngredient.ingredientId = ingredient.id;
            storeIngredient.storeId = storeAmount.id;
            storeIngredient.quantity = storeAmount.quantity;

            await storeIngredientRepo.save(storeIngredient);
        }

        response.status(200);
        response.send(ingredient);
    }

    ingredient: Ingredient, store: Store, quantity: number

    async UpdateStoreIngredientQuantity(request: Request, response: Response){
        response.send(await createQueryBuilder<StoreIngredient>("StoreIngredient")
            .update(StoreIngredient)
            .set({ quantity: request.body.quantity })
            .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: request.body.storeId, ingredientId: request.body.ingredientId})
            .execute()
        );
    }
}
