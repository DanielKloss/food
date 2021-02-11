import { Router } from "express";
import { RecipeController } from "./controller/recipeController";

const router = Router();

router.get("/recipes", RecipeController.GetAllRecipes);