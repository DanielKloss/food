import { Request, Response } from "express";
import { createQueryBuilder, getRepository } from "typeorm";
import { Store } from "../entity/store";
import { StoreIngredient } from "../entity/storeIngredient";

export class StoreController {

    static async GetAllStores(request: Request, response: Response){
        let storeRepo = getRepository(Store);
        response.send(await storeRepo.find());
    }

    static async GetAllStoresAndQuantities(request: Request, response: Response){
        response.send(
            await createQueryBuilder<Store>("Store")
            .leftJoinAndSelect("Store.storeIngredient", "storeIngredient")
            .leftJoinAndSelect("storeIngredient.ingredient", "ingredient")
            .leftJoinAndSelect("ingredient.unit", "unit")
            .orderBy("Store.name")
            .getMany()
        );
    }

    static async GetAllQuantities(request: Request, response: Response) {
        response.send(
            await createQueryBuilder<StoreIngredient>("StoreIngredient")
            .getMany()
        )
    }
}
