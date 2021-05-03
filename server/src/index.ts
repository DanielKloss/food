import "reflect-metadata";
import express = require("express");
import cors = require("cors");
import { createConnection } from "typeorm";
import { RecipeController } from "./controller/recipeController";
import { IngredientController } from "./controller/ingredientController";
import { StoreController } from "./controller/storeController";

createConnection().then(async () => {
    const app = express();
    const port = 8080;

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded());

    app.get("recipes", RecipeController.GetAllRecipes);
    app.get("recipeByName", RecipeController.GetRecipeIngredientsAndInstructionsByName);
    app.get("recipesByTag", RecipeController.GetRecipesByTag);
    app.get("recipesByIngredient", RecipeController.GetRecipesByIngredient);
    app.post("recipe", RecipeController.InsertRecipe);

    app.get("stores", StoreController.GetAllStores);
    app.get("storesAndQuantities", StoreController.GetAllStoresAndQuantities);
    app.get("quantities", StoreController.GetAllQuantities);

    app.get("ingredients", IngredientController.getAllIngredients)
    app.get("units", IngredientController.getAllUnits);
    app.get("ingredientAndStores", IngredientController.getIngredientandStores);
    app.put("updateIngredient", IngredientController.UpdateStoreIngredientQuantity);
    app.put("updateStockIngredient", IngredientController.UpdateIngredientStock);
    app.post("insertIngredient", IngredientController.InsertIngredient);

    app.listen(port, () => {
        console.log("server started at localhost: " + port);
    })

}).catch(error => console.log(error));
