import { StoreIngredient } from "./storeIngredient";

export class Store {
    constructor(
        public id: number,
        public name: string,
        public storeIngredient: StoreIngredient[]
    ){ }
}
