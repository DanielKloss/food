import { IngredientStore } from "./ingredientStore";
import { Unit } from "./unit";

export class Ingredient {
    public id: number
    constructor(
        public name: string,
        public unit: Unit,
        public storeIngredient: IngredientStore[]
    ){ }
}
