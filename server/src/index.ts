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

    app.get("foodApi/recipes", RecipeController.GetAllRecipes);
    app.get("foodApi/recipeByName", RecipeController.GetRecipeIngredientsAndInstructionsByName);
    app.get("foodApi/recipesByTag", RecipeController.GetRecipesByTag);
    app.get("foodApi/recipesByIngredient", RecipeController.GetRecipesByIngredient);
    app.post("foodApi/recipe", RecipeController.InsertRecipe);

    app.get("foodApi/stores", StoreController.GetAllStores);
    app.get("foodApi/storesAndQuantities", StoreController.GetAllStoresAndQuantities);
    app.get("foodApi/quantities", StoreController.GetAllQuantities);

    app.get("foodApi/ingredients", IngredientController.getAllIngredients)
    app.get("foodApi/units", IngredientController.getAllUnits);
    app.get("foodApi/ingredientAndStores", IngredientController.getIngredientandStores);
    app.put("foodApi/updateIngredient", IngredientController.UpdateStoreIngredientQuantity);
    app.put("foodApi/updateStockIngredient", IngredientController.UpdateIngredientStock);
    app.post("foodApi/insertIngredient", IngredientController.InsertIngredient);

    app.listen(port, () => {
        console.log("server started at localhost: " + port);
    })

}).catch(error => console.log(error));
