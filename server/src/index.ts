import "reflect-metadata";
import express = require("express");
import { createConnection, getRepository, Repository } from "typeorm";
import { IngredientController } from "./controller/ingredientController";
import { RecipeController } from "./controller/recipeController";
import { Ingredient } from "./entity/Ingredient";
import { Instruction } from "./entity/instruction";
import { Recipe } from "./entity/recipe";
import { RecipeIngredient } from "./entity/recipeIngredient";
import { StoreIngredient } from "./entity/storeIngredient";
import { Tag } from "./entity/tag";
import { Unit } from "./entity/unit";
import cors = require("cors");
import { Router } from "express";

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

    app.listen(port, () => {
        console.log("server started at localhost: " + port);
    })

}).catch(error => console.log(error));
