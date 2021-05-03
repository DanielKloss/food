import "reflect-metadata";
import express = require("express");
import cors = require("cors");
import { createConnection } from "typeorm";
import { RecipeController } from "./controller/recipeController";
import { IngredientController } from "./controller/ingredientController";
import { StoreController } from "./controller/storeController";

createConnection().then(async () => {
    const app = express();
    const port = 8000;

    app.use(cors());

    app.use(express.json());
    app.use(express.urlencoded());

    app.get("food/api/recipes", RecipeController.GetAllRecipes);
    app.get("food/api/recipeByName", RecipeController.GetRecipeIngredientsAndInstructionsByName);
    app.get("food/api/recipesByTag", RecipeController.GetRecipesByTag);
    app.get("food/api/recipesByIngredient", RecipeController.GetRecipesByIngredient);
    app.post("food/api/recipe", RecipeController.InsertRecipe);

    app.get("food/api/stores", StoreController.GetAllStores);
    app.get("food/api/storesAndQuantities", StoreController.GetAllStoresAndQuantities);
    app.get("food/api/quantities", StoreController.GetAllQuantities);

    app.get("food/api/ingredients", IngredientController.getAllIngredients)
    app.get("food/api/units", IngredientController.getAllUnits);
    app.get("food/api/ingredientAndStores", IngredientController.getIngredientandStores);
    app.put("food/api/updateIngredient", IngredientController.UpdateStoreIngredientQuantity);
    app.put("food/api/updateStockIngredient", IngredientController.UpdateIngredientStock);
    app.post("food/api/insertIngredient", IngredientController.InsertIngredient);

    app.listen(port, () => {
        console.log("server started at localhost: " + port);
    })

}).catch(error => console.log(error));
