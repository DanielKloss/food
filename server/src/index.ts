import "reflect-metadata";
import express = require("express");
import cors = require("cors");
import { createConnection } from "typeorm";
import { RecipeController } from "./controller/recipeController";
import { IngredientController } from "./controller/ingredientController";

createConnection().then(async () => {
    const app = express();
    const port = 8080;

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded());

    app.get("/recipes", RecipeController.GetAllRecipes);
    app.get("/recipeByName", RecipeController.GetRecipeIngredientsAndInstructionsByName);
    app.get("/recipesByTag", RecipeController.GetRecipesByTag);
    app.get("/recipesByIngredient", RecipeController.GetRecipesByIngredient);
    app.post("/recipe", RecipeController.InsertRecipe);

    app.post("/ingredient", IngredientController.InsertIngredient);
    app.put("/stroreIngredients", IngredientController.UpdateStoreIngredientQuantity);

    app.listen(port, () => {
        console.log("server started at localhost: " + port);
    })

}).catch(error => console.log(error));
