import "reflect-metadata";
import {createConnection} from "typeorm";
import {Ingredient} from "./entity/Ingredient";
import { Recipe } from "./entity/recipe";

createConnection().then(async connection => {
    console.log("Inserting a new recipe into the database")
    const recipe = new Recipe();
    recipe.name = "Chicken Soup";
    recipe.cookingTime = 10;
    await connection.manager.save(recipe);
    console.log("Saved a new recipe with id: " + recipe.id);

    console.log("Inserting a new ingredient into the database...");
    const ingredient = new Ingredient();
    ingredient.name = "Chicken";
    ingredient.recipes = [recipe]
    await connection.manager.save(ingredient);
    console.log("Saved a new ingredient with id: " + ingredient.id);

    console.log("Inserting a new ingredient into the database...");
    const ingredient2 = new Ingredient();
    ingredient2.name = "Water";
    ingredient2.recipes = [recipe]
    await connection.manager.save(ingredient2);
    console.log("Saved a new ingredient with id: " + ingredient2.id);

    console.log("Loading ingredients from the database...");
    const ingredients = await connection.manager.find(Ingredient);
    console.log("Loaded ingredients: ", ingredients);

    console.log("Loading recipes and their ingredients from the database...")
    const recipes = await connection.manager.findOne(Recipe, {relations: ["ingredients"]});

    //Here you can setup and run express/koa/any other framework

}).catch(error => console.log(error));
