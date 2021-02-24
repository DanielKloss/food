import { Ingredient } from "./ingredient";
import { Store } from "./store";

export class StoreIngredient {
    constructor(
        public quantity: number,
        public ingredient: Ingredient
    ){ }
}
