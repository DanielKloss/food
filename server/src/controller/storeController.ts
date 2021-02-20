import { Request, Response } from "express";
import { getRepository } from "typeorm";
import { Store } from "../entity/store";

export class StoreController {

    static async GetAllStores(request: Request, response: Response){
        let storeRepo = getRepository(Store);
        response.send(await storeRepo.find());
    }

}
