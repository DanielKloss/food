import "reflect-metadata";
import {Connection, createConnection, Repository} from "typeorm";
import { IngredientController } from "./controller/ingredientController";
import { RecipeController } from "./controller/recipeController";
import { RecipeIngredientController } from "./controller/recipeIngredientController";
import { Ingredient } from "./entity/Ingredient";
import { Recipe } from "./entity/recipe";
import { RecipeIngredient } from "./entity/recipeIngredient";

var connection: Connection;

export async function connect() {
    connection = await createConnection();
}
export function connected() { 
    return typeof connection !== 'undefined'; 
}

connect();

const queryRunner = connection.createQueryRunner();
queryRunner.connect();
queryRunner.query("DELETE FROM recipe_ingredient");
queryRunner.query("DELETE FROM recipe");
queryRunner.query("DELETE FROM ingredient");

// var ingredientController = new IngredientController(connection.getRepository(Ingredient));
// var recipeController = new RecipeController(connection.getRepository(Recipe));
// var recipeIngredientController = new RecipeIngredientController(connection.getRepository(RecipeIngredient));

// var ingredient = new Ingredient();
// ingredient.name = "Chicken";
// var ingredient2 = new Ingredient();
// ingredient.name = "Water";
// ingredientController.InsertIngredients([ingredient, ingredient2]);

// var recipe = new Recipe();
// recipe.name = "Chicken Soup";
// recipe.cookingTime = 10;
// recipeController.InsertRecipes([recipe]);

// var recipeIngredient = new RecipeIngredient();
// recipeIngredient.ingredient = ingredient;
// recipeIngredient.quantity = 1;
// recipeIngredient.unitId = 0;

// var recipeIngredient2 = new RecipeIngredient();
// recipeIngredient2.ingredient = ingredient2;
// recipeIngredient2.quantity = 100;
// recipeIngredient2.unitId = 1;

// recipeIngredientController.InsertRecipeIngredients([recipeIngredient, recipeIngredient2])

//createConnection().then(async connection => {
    // const queryRunner = connection.createQueryRunner();
    // await queryRunner.connect();
    // await queryRunner.query("DELETE FROM recipe_ingredient");
    // await queryRunner.query("DELETE FROM recipe");
    // await queryRunner.query("DELETE FROM ingredient");

    // console.log("Inserting a new recipe into the database")
    // const recipe = new Recipe();
    // recipe.name = "Chicken Soup";
    // recipe.cookingTime = 10;
    // await connection.manager.save(recipe);
    // console.log("Saved a new recipe with id: " + recipe.id);

    // console.log("Inserting a new ingredient into the database...");
    // const ingredient = new Ingredient();
    // ingredient.name = "Chicken";
    // await connection.manager.save(ingredient);
    // console.log("Saved a new ingredient with id: " + ingredient.id);

    // console.log("Inserting a new ingredient into the database...");
    // const ingredient2 = new Ingredient();
    // ingredient2.name = "Water";
    // await connection.manager.save(ingredient2);
    // console.log("Saved a new ingredient with id: " + ingredient2.id);

    // console.log("Inserting RecipeIngredients into the database...");
    // const recipeIngredient = new RecipeIngredient();
    // recipeIngredient.recipe = recipe;
    // recipeIngredient.ingredient = ingredient;
    // recipeIngredient.quantity = 1;
    // recipeIngredient.unitId = 0
    // await connection.manager.save(recipeIngredient);
    // console.log("Saved a new recipeIngredient with id: " + recipeIngredient.recipeId + "/" + recipeIngredient.ingredientId)

    // console.log("Inserting RecipeIngredients into the database...");
    // const recipeIngredient2 = new RecipeIngredient();
    // recipeIngredient2.recipe = recipe;
    // recipeIngredient2.ingredient = ingredient2;
    // recipeIngredient2.quantity = 100;
    // recipeIngredient2.unitId = 1
    // await connection.manager.save(recipeIngredient2);
    // console.log("Saved a new recipeIngredient with id: " + recipeIngredient2.recipeId + "/" + recipeIngredient2.ingredientId)
 
    // console.log("Loading ingredients from the database...");
    // const ingredients = await connection.manager.find(Ingredient);
    // console.log("Loaded ingredients: ", ingredients);

    //console.log("Loading recipes and their ingredients from the database...")
    //const recipes = await connection.manager.findOne(Recipe, {relations: ["ingredients"]});

    //Here you can setup and run express/koa/any other framework

//}).catch(error => console.log(error));
