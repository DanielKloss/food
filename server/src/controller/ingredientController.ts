import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { StoreIngredient } from "../entity/storeIngredient";
import { Unit } from "../entity/unit";

const util = require('util')

export class IngredientController {

    //util.inspect(newStoreIngredient, false, null, true)

    static async getAllIngredients(request: Request, response: Response) {
        response.send(
            await createQueryBuilder<Ingredient>("Ingredient")
            .leftJoinAndSelect("Ingredient.unit", "unit")
            .getMany()
        )
    }

    static async getAllUnits(request: Request, response: Response) {
        response.send(
            await createQueryBuilder<Unit>("Unit")
                .getMany()
        )
    }

    static async UpdateIngredient(storeIngredients: StoreIngredient[], ingredientId: number){
        for (const storeIngredient of storeIngredients) {
            let exisitingStoreIngredient = await createQueryBuilder<StoreIngredient>("StoreIngredient")
                .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: storeIngredient.store.id, ingredientId: ingredientId})
                .getOne();

            if(storeIngredient.quantity == 0 || storeIngredient.quantity == null || storeIngredient.quantity == undefined){
                if (exisitingStoreIngredient != undefined){
                    await createQueryBuilder<StoreIngredient>("StoreIngredient")
                    .delete()
                    .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: storeIngredient.store.id, ingredientId: ingredientId})
                    .execute()
                }
            } else {
                if(exisitingStoreIngredient != undefined){
                    await createQueryBuilder<StoreIngredient>("StoreIngredient")
                        .update(StoreIngredient)
                        .set({ quantity: storeIngredient.quantity })
                        .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: storeIngredient.store.id, ingredientId: ingredientId })
                        .execute()
                } else {
                    let storeIngredientRepo = getRepository(StoreIngredient);
                    let newStoreIngredient = new StoreIngredient();
                    newStoreIngredient.ingredientId = ingredientId;
                    newStoreIngredient.storeId = storeIngredient.store.id;
                    newStoreIngredient.quantity = storeIngredient.quantity;
                    await storeIngredientRepo.save(newStoreIngredient)
                }
            }
        }
    }

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

    static async UpdateStoreIngredientQuantity(request: Request, response: Response){
        response.status(200);
        response.send(await IngredientController.UpdateIngredient(request.body.storeIngredient, request.body.id));
    }

    static async UpdateIngredientStock(request: Request, response: Response) {
        console.log("Updating Stock!");
        let storeIngredientRepo = getRepository(StoreIngredient);
        if (request.body.quantity == 0){
            await storeIngredientRepo.delete([request.body.ingredientId, request.body.storeId]);
        } else {
            await storeIngredientRepo.update({ quantity: request.body.quantity }, { ingredientId: request.body.ingredientId, storeId: request.body.storeId });
        }
    }

    static async InsertIngredient(request: Request, response: Response){
        let ingredientRepo = getRepository(Ingredient);
        let unitRepo = getRepository(Unit);
        let storeIngredientRepo = getRepository(StoreIngredient);

        let foundIngredient = await ingredientRepo.findOne({name: request.body.name});
        if (foundIngredient == undefined){
            let unit = await unitRepo.findOne({name: request.body.unit.name})
            if (unit){
                request.body.unit.id = unit.id;
            }

            let ingredient = await ingredientRepo.save(request.body);

            for (const storeIngredient of request.body.storeIngredient) {
                if (storeIngredient.quantity != undefined && storeIngredient.quantity > 0){
                    let newStoreIngredient = new StoreIngredient();
                    newStoreIngredient.ingredientId = ingredient.id;
                    newStoreIngredient.storeId = storeIngredient.store.id;
                    newStoreIngredient.quantity = storeIngredient.quantity;

                    await storeIngredientRepo.save(newStoreIngredient);
                }
            }
            response.status(200);
            response.send(ingredient);
        } else {
            response.status(200);
            response.send(await IngredientController.UpdateIngredient(request.body.storeIngredient, foundIngredient.id));
        }
    }
}