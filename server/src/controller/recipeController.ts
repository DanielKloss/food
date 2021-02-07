import { Repository } from "typeorm";
import { Ingredient } from "../entity/Ingredient";
import { Instruction } from "../entity/instruction";
import { Recipe } from "../entity/recipe";
import { RecipeIngredient } from "../entity/recipeIngredient";
import { Tag } from "../entity/tag";
import { Unit } from "../entity/unit";

export class RecipeController {

    recipeRepo: Repository<Recipe>;
    ingredientRepo: Repository<Ingredient>;
    recipeIngredientRepo: Repository<RecipeIngredient>;
    unitRepo: Repository<Unit>;
    tagRepo: Repository<Tag>;
    instructionRepo: Repository<Instruction>;

    constructor(recipeRepository: Repository<Recipe>, ingredientRepository: Repository<Ingredient>, recipeIngredientRepository: Repository<RecipeIngredient>, unitRepository: Repository<Unit>, tagRepository: Repository<Tag>, instructionRepository: Repository<Instruction>){
        this.recipeRepo = recipeRepository;
        this.ingredientRepo = ingredientRepository;
        this.recipeIngredientRepo = recipeIngredientRepository;
        this.unitRepo = unitRepository;
        this.tagRepo = tagRepository;
        this.instructionRepo = instructionRepository;
    }

    async InsertRecipe(recipeToAdd: Recipe, recipeIngredients: Ingredient[], quantities: number[]){
        let recipe = await this.recipeRepo.findOne({name: recipeToAdd.name});
        if (recipe != undefined){
            throw "Recipe already exists";
        }
        
        for (const tag of recipeToAdd.tag) {
            let foundTag = await this.tagRepo.findOne({name: tag.name});
            if (foundTag){
                tag.id = foundTag.id;
            }
        }

        for (const instruction of recipeToAdd.instruction) {
            let foundInstruction = await this.instructionRepo.findOne({description: instruction.description});
            if (foundInstruction) {
                instruction.id = foundInstruction.id;
            }
        }

        await this.recipeRepo.save(recipeToAdd);

        for (let i = 0; i < recipeIngredients.length; i++) {
            let ingredient = await this.ingredientRepo.findOne({name: recipeIngredients[i].name})
            if (ingredient == undefined){
                let unit = await this.unitRepo.findOne({name: recipeIngredients[i].unit.name})
                if (unit){
                    ingredient.unit.id = unit.id;
                }
                ingredient = await this.ingredientRepo.save(recipeIngredients[i]);
            }
            
            let recipeIngredient = new RecipeIngredient();
            recipeIngredient.ingredientId = ingredient.id;
            recipeIngredient.recipeId = recipeToAdd.id;
            recipeIngredient.quantity = quantities[i];
                                
            await this.recipeIngredientRepo.save(recipeIngredient);
        }
    }
}