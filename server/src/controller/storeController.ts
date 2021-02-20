import { Request, Response } from "express";
import { createQueryBuilder } from "typeorm";
import { Store } from "../entity/store";

export class StoreController {

    static async GetAllStores(request: Request, response: Response){
        response.send(
            await createQueryBuilder<Store>("Store")
            .innerJoinAndSelect("Store.storeIngredient", "storeIngredient")
            .innerJoinAndSelect("storeIngredient.ingredient", "ingredient")
            .innerJoinAndSelect("ingredient.unit", "unit")
            .getMany()
        );
    }

}
