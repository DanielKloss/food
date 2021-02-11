import "reflect-metadata";
import { createConnection } from "typeorm";
import { RecipeController } from "./controller/recipeController";
import { Ingredient } from "./entity/Ingredient";
import { Instruction } from "./entity/instruction";
import { Recipe } from "./entity/recipe";
import { RecipeIngredient } from "./entity/recipeIngredient";
import { Tag } from "./entity/tag";
import { Unit } from "./entity/unit";

createConnection().then(async connection => {
    const recipeController = new RecipeController(connection.getRepository(Recipe), connection.getRepository(Ingredient), connection.getRepository(RecipeIngredient), connection.getRepository(Unit), connection.getRepository(Tag), connection.getRepository(Instruction));

    let recipes = await recipeController.GetRecipesByTag("Starter");
    for (const recipe of recipes) {
        console.log(recipe);
    }

    // let recipe = await recipeController.GetRecipeIngredientsAndInstructionsByName("Chicken Soup");    

    // console.log(recipe.name + " - " + recipe.cookingTime + " minutes");
    // for (const recipeIngredient of recipe.recipeIngredient) {
    //     console.log(recipeIngredient.ingredient.name + " - " + recipeIngredient.quantity + " " + recipeIngredient.ingredient.unit.name);
    // }
    // for (const instruction of recipe.instruction) {
    //     console.log(instruction.description);
    // }

    // const queryRunner = connection.createQueryRunner();
    // queryRunner.connect();
    // queryRunner.query("DELETE FROM recipe_ingredient");
    // queryRunner.query("DELETE FROM recipe");
    // queryRunner.query("DELETE FROM ingredient");

    // var unit = new Unit();
    // unit.name = "Milliliters";
    // unit.symbol = "ml";

    // var unit2 = new Unit();
    // unit2.name = "Grams";
    // unit2.symbol = "g";

    // var tag = new Tag();
    // tag.name = "Lunch";
    // var tag2 = new Tag();
    // tag2.name = "Starter";

    // var instruction = new Instruction();
    // instruction.description = "Boil the water";
    // var instruction2 = new Instruction();
    // instruction2.description = "Add the veg";

    // var ingredient = new Ingredient();
    // ingredient.name = "Vegetable";
    // ingredient.unit = unit2;
    // var ingredient2 = new Ingredient();
    // ingredient2.name = "Water";
    // ingredient2.unit = unit;

    // var recipe = new Recipe();
    // recipe.name = "Vegetable Soup";
    // recipe.cookingTime = 10;
    // recipe.instruction = [instruction , instruction2];
    // recipe.tag = [tag, tag2];

    // console.log("Inserting recipe and associations");

    // await recipeController.InsertRecipe(recipe, [ingredient, ingredient2], [100, 100]); 
    // console.log("Finsihed First Insert!");

    // var unit = new Unit();
    // unit.name = "Milliliters";
    // unit.symbol = "ml";

    // var unit2 = new Unit();
    // unit2.name = "Grams";
    // unit2.symbol = "g";

    // var tag = new Tag();
    // tag.name = "Lunch";
    // var tag2 = new Tag();
    // tag2.name = "Starter";

    // var instruction = new Instruction();
    // instruction.description = "Boil the water";
    // var instruction2 = new Instruction();
    // instruction2.description = "Add the chicken";

    // var ingredient = new Ingredient();
    // ingredient.name = "Chicken";
    // ingredient.unit = unit2;
    // var ingredient2 = new Ingredient();
    // ingredient2.name = "Water";
    // ingredient2.unit = unit;

    // var recipe = new Recipe();
    // recipe.name = "Chicken Soup";
    // recipe.cookingTime = 10;
    // recipe.instruction = [instruction , instruction2];
    // recipe.tag = [tag, tag2];

    // console.log("Inserting recipe and associations");

    // await recipeController.InsertRecipe(recipe, [ingredient, ingredient2], [100, 100]);
    // console.log("Finsihed Second Insert!");    

    //Here you can setup and run express/koa/any other framework

}).catch(error => console.log(error));
