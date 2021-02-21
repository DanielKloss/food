import { Ingredient } from "./ingredient";

export class StoreIngredient {
    constructor(
        public quantity: number,
        public ingredient: Ingredient,
    ){ }
}
