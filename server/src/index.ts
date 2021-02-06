import "reflect-metadata";
import {createConnection} from "typeorm";
import { RecipeController } from "./controller/recipeController";
import { Ingredient } from "./entity/Ingredient";
import { Recipe } from "./entity/recipe";
import { RecipeIngredient } from "./entity/recipeIngredient";

createConnection().then(connection => {
    const recipeController = new RecipeController(connection.getRepository(Recipe), connection.getRepository(Ingredient), connection.getRepository(RecipeIngredient));

    // const queryRunner = connection.createQueryRunner();
    // queryRunner.connect();
    // queryRunner.query("DELETE FROM recipe_ingredient");
    // queryRunner.query("DELETE FROM recipe");
    // queryRunner.query("DELETE FROM ingredient");

    var ingredient = new Ingredient();
    ingredient.name = "Chicken";
    var ingredient2 = new Ingredient();
    ingredient2.name = "Water";

    var recipe = new Recipe();
    recipe.name = "Chicken Soup";
    recipe.cookingTime = 10;

    console.log("Inserting recipe and associations");

    recipeController.InsertRecipe(recipe, [ingredient, ingredient2], [1, 100], [0, 1]).then(() => console.log("Finsihed!"));

    //Here you can setup and run express/koa/any other framework

}).catch(error => console.log(error));
