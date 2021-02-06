import {Entity, Column, ManyToMany, PrimaryColumn, ManyToOne, JoinColumn} from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./recipe";

@Entity()
export class RecipeIngredient {

    @PrimaryColumn()
    recipeId: number;

    @PrimaryColumn()
    ingredientId: number;
    
    @Column()
    unitId: number;

    @Column()
    quantity: number;

    @ManyToOne(type => Recipe, recipe => recipe.recipeIngredient)
    @JoinColumn({name: "recipeId" })
    recipe: Recipe
    
    @ManyToOne(type => Ingredient, ingredient => ingredient.recipeIngredient)
    @JoinColumn({name: "ingredientId" })
    ingredient: Ingredient
}
