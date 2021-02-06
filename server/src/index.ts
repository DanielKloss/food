import "reflect-metadata";
import {createConnection} from "typeorm";
import {Ingredient} from "./entity/Ingredient";

createConnection().then(async connection => {
    console.log("Inserting a new ingredient into the database...");
    const ingredient = new Ingredient();
    ingredient.name = "Chicken";
    await connection.manager.save(ingredient);
    console.log("Saved a new ingredient with id: " + ingredient.id);

    console.log("Loading ingredients from the database...");
    const ingredients = await connection.manager.find(Ingredient);
    console.log("Loaded ingredients: ", ingredients);

    //Here you can setup and run express/koa/any other framework

}).catch(error => console.log(error));
