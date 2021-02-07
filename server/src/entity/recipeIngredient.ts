import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./recipe";

@Entity({name: "RecipeIngredients"})
export class RecipeIngredient {

    @PrimaryColumn()
    recipeId: number;

    @PrimaryColumn()
    ingredientId: number;

    @Column()
    quantity: number;

    @ManyToOne(type => Recipe, recipe => recipe.recipeIngredient, {cascade:true})
    @JoinColumn({name: "recipeId" })
    recipe: Recipe
    
    @ManyToOne(type => Ingredient, ingredient => ingredient.recipeIngredient, {cascade:true})
    @JoinColumn({name: "ingredientId" })
    ingredient: Ingredient

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
