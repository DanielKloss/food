import { Instruction } from "./description";
import { RecipeIngredient } from "./recipeIngredient";
import { Tag } from "./tag";

export class Recipe {
    constructor(
        public name: string,
        public cookingTime: number,
        public tag: Tag[],
        public instruction: Instruction[],
        public recipeIngredient: RecipeIngredient[]
    ){ }
}
