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

    @ManyToOne(() => Recipe, recipe => recipe.recipeIngredient)
    @JoinColumn({name: "recipeId" })
    recipe: Recipe
    
    @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredient)
    @JoinColumn({name: "ingredientId" })
    ingredient: Ingredient

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
