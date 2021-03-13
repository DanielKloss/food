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

    app.get("/api/recipes", RecipeController.GetAllRecipes);
    app.get("/api/recipeByName", RecipeController.GetRecipeIngredientsAndInstructionsByName);
    app.get("/api/recipesByTag", RecipeController.GetRecipesByTag);
    app.get("/api/recipesByIngredient", RecipeController.GetRecipesByIngredient);
    app.post("/api/recipe", RecipeController.InsertRecipe);

    app.get("/api/stores", StoreController.GetAllStores);
    app.get("/api/storesAndQuantities", StoreController.GetAllStoresAndQuantities);
    app.get("/api/quantities", StoreController.GetAllQuantities);

    app.get("/api/ingredients", IngredientController.getAllIngredients)
    app.get("/api/units", IngredientController.getAllUnits);
    app.get("/api/ingredientAndStores", IngredientController.getIngredientandStores);
    app.put("/api/updateIngredient", IngredientController.UpdateStoreIngredientQuantity);
    app.put("/api/unpdateIngredientStock", IngredientController.UpdateIngredientStock);
    app.post("/api/insertIngredient", IngredientController.InsertIngredient);

    app.listen(port, () => {
        console.log("server started at localhost: " + port);
    })

}).catch(error => console.log(error));
