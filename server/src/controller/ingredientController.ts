import { Request, Response } from "express";
import { createQueryBuilder, getRepository, QueryBuilder } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { StoreIngredient } from "../entity/storeIngredient";
import { Unit } from "../entity/unit";

export class IngredientController {

    static async getIngredientandStores(request: Request, response: Response){
        response.send(
            await createQueryBuilder<Ingredient>("Ingredient")
            .leftJoinAndSelect("Ingredient.storeIngredient", "storeIngredient")
            .leftJoinAndSelect("storeIngredient.store", "store")
            .leftJoinAndSelect("Ingredient.unit", "unit")
            .where("Ingredient.id = :id", { id: request.query.ingredientId })
            .getOne()
        )
    }

    static async UpsertStoreIngredientQuantity(request: Request, response: Response){
        console.log(request.body.storeIngredient[1].store);
        for (const store of request.body.storeIngredient) {
            let storeIngredient = await createQueryBuilder<StoreIngredient>("StoreIngredient")
            .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: store.storeId, ingredientId: request.body.id})
            .getOne();

            if(storeIngredient != undefined){
                await createQueryBuilder<StoreIngredient>("StoreIngredient")
                    .update(StoreIngredient)
                    .set({ quantity: request.body.quantity })
                    .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: store.storeId, ingredientId: request.body.id})
                    .execute()
            } else {
                let storeIngredientRepo = getRepository(StoreIngredient);
                let storeIngredient = new StoreIngredient();
                storeIngredient.ingredientId = request.body.id;
                storeIngredient.storeId = store.storeId;
                storeIngredient.quantity = store.quantity;
                await storeIngredientRepo.save(storeIngredient)
            }
        }

        response.status(200);
        response.send();
    }

    static async getAllIngredients(request: Request, response: Response) {
        response.send(
            await createQueryBuilder<Ingredient>("Ingredient")
            .leftJoinAndSelect("Ingredient.storeIngredient", "storeIngredient")
            .leftJoinAndSelect("storeIngredient.store", "store")
            .innerJoinAndSelect("Ingredient.unit", "unit")
            .orderBy("Ingredient.name", "ASC")
            .getMany()
        );
    }

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
            if (storeAmount.quantity != undefined && storeAmount.quantity > 0){
                let storeIngredient = new StoreIngredient();
                storeIngredient.ingredientId = ingredient.id;
                storeIngredient.storeId = storeAmount.id;
                storeIngredient.quantity = storeAmount.quantity;

                await storeIngredientRepo.save(storeIngredient);
            }
        }

        response.status(200);
        response.send(ingredient);
    }

    
}
