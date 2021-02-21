import { StoreIngredient } from "./storeIngredient";

export class Store {
    constructor(
        public name: string,
        public storeIngredient: StoreIngredient[],
    ){ }
}
