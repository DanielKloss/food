import { IngredientStore } from "./ingredientStore";
import { Unit } from "./unit";

export class Ingredient {
    constructor(
        public id: number,
        public name: string,
        public unit: Unit,
        public storeIngredient: IngredientStore[]
    ){ }
}
