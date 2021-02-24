import { Ingredient } from "./ingredient";
import { Store } from "./store";

export class IngredientStore {
    constructor(
        public quantity: number,
        public store: Store
    ){ }
}
