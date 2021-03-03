import { Ingredient } from "./ingredient";

export class StoreIngredient {
    constructor(
        public ingredientId: number,
        public storeId: number,
        public quantity: number,
        public ingredient: Ingredient
    ){ }
}
