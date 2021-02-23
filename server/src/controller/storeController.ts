import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Store } from "../entity/store";

export class StoreController {

    static async GetAllStores(request: Request, response: Response){
        let storeRepo = getRepository(Store);
        response.send(await storeRepo.find());
    }

    static async GetAllStoresAndQuantities(request: Request, response: Response){
        response.send(
            await createQueryBuilder<Store>("Store")
            .innerJoinAndSelect("Store.storeIngredient", "storeIngredient")
            .innerJoinAndSelect("storeIngredient.ingredient", "ingredient")
            .innerJoinAndSelect("ingredient.unit", "unit")
            .orderBy("ingredient.name")
            .getMany()
        );
    }

}
