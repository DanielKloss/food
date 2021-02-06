import "reflect-metadata";
import {createConnection} from "typeorm";
import { Ingredient } from "./entity/Ingredient";
import { Recipe } from "./entity/recipe";
import { RecipeIngredient } from "./entity/recipeIngredient";

createConnection().then(async connection => {
    const queryRunner = connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.query("DELETE * FROM recipe_ingredient");
    await queryRunner.query("DELETE * FROM recipe");
    await queryRunner.query("DELETE * FROM ingredient");

    console.log("Inserting a new recipe into the database")
    const recipe = new Recipe();
    recipe.name = "Chicken Soup";
    recipe.cookingTime = 10;
    await connection.manager.save(recipe);
    console.log("Saved a new recipe with id: " + recipe.id);

    console.log("Inserting a new ingredient into the database...");
    const ingredient = new Ingredient();
    ingredient.name = "Chicken";
    await connection.manager.save(ingredient);
    console.log("Saved a new ingredient with id: " + ingredient.id);

    console.log("Inserting a new ingredient into the database...");
    const ingredient2 = new Ingredient();
    ingredient2.name = "Water";
    await connection.manager.save(ingredient2);
    console.log("Saved a new ingredient with id: " + ingredient2.id);

    console.log("Inserting RecipeIngredients into the database...");
    const recipeIngredient = new RecipeIngredient();
    recipeIngredient.recipe = recipe;
    recipeIngredient.ingredient = ingredient;
    recipeIngredient.quantity = 1;
    recipeIngredient.unitId = 0
    await connection.manager.save(recipeIngredient);
    console.log("Saved a new recipeIngredient with id: " + recipeIngredient.recipeId + "/" + recipeIngredient.ingredientId)

    console.log("Inserting RecipeIngredients into the database...");
    const recipeIngredient2 = new RecipeIngredient();
    recipeIngredient2.recipe = recipe;
    recipeIngredient2.ingredient = ingredient2;
    recipeIngredient2.quantity = 100;
    recipeIngredient2.unitId = 1
    await connection.manager.save(recipeIngredient2);
    console.log("Saved a new recipeIngredient with id: " + recipeIngredient2.recipeId + "/" + recipeIngredient2.ingredientId)
 
    console.log("Loading ingredients from the database...");
    const ingredients = await connection.manager.find(Ingredient);
    console.log("Loaded ingredients: ", ingredients);

    //console.log("Loading recipes and their ingredients from the database...")
    //const recipes = await connection.manager.findOne(Recipe, {relations: ["ingredients"]});

    //Here you can setup and run express/koa/any other framework

}).catch(error => console.log(error));
