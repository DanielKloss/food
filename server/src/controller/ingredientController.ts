import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { StoreIngredient } from "../entity/storeIngredient";
import { Unit } from "../entity/unit";

const util = require('util')

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

    static async UpdateStoreIngredientQuantity(request: Request, response: Response){
        for (const storeIngredient of request.body.storeIngredient) {
            let exisitingStoreIngredient = await createQueryBuilder<StoreIngredient>("StoreIngredient")
                .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: storeIngredient.store.id, ingredientId: request.body.id})
                .getOne();

            if(storeIngredient.quantity == 0 || storeIngredient.quantity == null || storeIngredient.quantity == undefined){
                if (exisitingStoreIngredient != undefined){
                    await createQueryBuilder<StoreIngredient>("StoreIngredient")
                    .delete()
                    .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: storeIngredient.store.id, ingredientId: request.body.id})
                    .execute()
                }
            } else {
                if(exisitingStoreIngredient != undefined){
                    await createQueryBuilder<StoreIngredient>("StoreIngredient")
                        .update(StoreIngredient)
                        .set({ quantity: storeIngredient.quantity })
                        .where("storeId = :storeId and ingredientId = :ingredientId", { storeId: storeIngredient.store.id, ingredientId: request.body.id })
                        .execute()
                } else {
                    let storeIngredientRepo = getRepository(StoreIngredient);
                    let newStoreIngredient = new StoreIngredient();
                    newStoreIngredient.ingredientId = request.body.id;
                    newStoreIngredient.storeId = storeIngredient.store.id;
                    newStoreIngredient.quantity = storeIngredient.quantity;
                    await storeIngredientRepo.save(newStoreIngredient)
                }
            }
        }

        response.status(200);
        response.send();
    }

    static async InsertIngredient(request: Request, response: Response){
        console.log(util.inspect(request.body, false, null, true));
        let ingredientRepo = getRepository(Ingredient);
        let unitRepo = getRepository(Unit);
        let storeIngredientRepo = getRepository(StoreIngredient);

        let foundIngredient = await ingredientRepo.findOne({name: request.body.name});
        if (foundIngredient != undefined){
            console.log("ingredient doesnt exist - adding new one");
            let unit = await unitRepo.findOne({name: request.body.unit.name})
            if (unit){
                console.log("unit exists already - assigning id");
                request.body.unit.id = unit.id;
            }

            console.log("saving ingredient");
            let ingredient = await ingredientRepo.save(request.body);
            console.log("ingredient saved " + ingredient.name);

            for (const storeIngredient of request.body.storeIngredients) {
                if (storeIngredient.quantity != undefined && storeIngredient.quantity > 0){
                    console.log("store ingredient more than 0")
                    let newStoreIngredient = new StoreIngredient();
                    newStoreIngredient.ingredientId = ingredient.id;
                    newStoreIngredient.storeId = storeIngredient.store.id;
                    newStoreIngredient.quantity = storeIngredient.quantity;

                    console.log("adding store ingredient");
                    await storeIngredientRepo.save(newStoreIngredient);
                }
            }
            response.status(200);
            response.send(ingredient);
        } else {
            response.status(200);
            response.send();
        }

        
    }

    
}
