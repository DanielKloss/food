import { Ingredient } from "./ingredient";

export class RecipeIngredient {
    constructor(
        public quantity: number,
        public ingredient: Ingredient
    ){ }
}
