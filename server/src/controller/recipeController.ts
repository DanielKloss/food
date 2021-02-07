import { Console } from "console";
import { Repository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { Recipe } from "../entity/recipe";
import { RecipeIngredient } from "../entity/recipeIngredient";

export class RecipeController {

    recipeRepo: Repository<Recipe>;
    ingredientRepo: Repository<Ingredient>;
    recipeIngredientRepo: Repository<RecipeIngredient>;

    constructor(recipeRepository: Repository<Recipe>, ingredientRepository: Repository<Ingredient>, recipeIngredientRepository: Repository<RecipeIngredient>){
        this.recipeRepo = recipeRepository;
        this.ingredientRepo = ingredientRepository;
        this.recipeIngredientRepo = recipeIngredientRepository;
    }

    async InsertRecipe(recipeToAdd: Recipe, recipeIngredients: Ingredient[], quantities: number[], unitIds: number[]){
        await this.recipeRepo.findOne({name: recipeToAdd.name}).then(async found => {
            if (found != undefined) {
                recipeToAdd.id = found.id;
            }
            await this.recipeRepo.save(recipeToAdd).then(async () => {
                for (let i = 0; i < recipeIngredients.length; i++) {
                    await this.ingredientRepo.findOne({name: recipeIngredients[i].name}).then(async found => {
                        if (found != undefined) {
                            recipeIngredients[i].id = found.id;
                        }
                        await this.ingredientRepo.save(recipeIngredients[i]).then(async ingredient => {
                            let recipeIngredient = new RecipeIngredient();
                            recipeIngredient.ingredientId = ingredient.id;
                            recipeIngredient.recipeId = recipeToAdd.id;
                            recipeIngredient.quantity = quantities[i];
                            recipeIngredient.unitId = unitIds[i];
                            
                            await this.recipeIngredientRepo.save(recipeIngredient);
                        });
                    });
                }
            });
        });
    }
}