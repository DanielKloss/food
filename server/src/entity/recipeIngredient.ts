import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Ingredient } from "./Ingredient";
import { Recipe } from "./recipe";
import { Unit } from "./unit";

@Entity({name: "RecipeIngredients"})
export class RecipeIngredient {

    @PrimaryColumn()
    recipeId: number;

    @PrimaryColumn()
    ingredientId: number;

    @Column()
    quantity: number;

    @ManyToOne(type => Unit, unit => unit.recipeIngredient)
    unit: Unit;

    @ManyToOne(type => Recipe, recipe => recipe.recipeIngredient)
    @JoinColumn({name: "recipeId" })
    recipe: Recipe
    
    @ManyToOne(type => Ingredient, ingredient => ingredient.recipeIngredient)
    @JoinColumn({name: "ingredientId" })
    ingredient: Ingredient

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
