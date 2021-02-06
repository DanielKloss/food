import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable, OneToMany} from "typeorm";
import { RecipeIngredient } from "./recipeIngredient";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cookingTime: number;

    @OneToMany(type => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
    recipeIngredient: RecipeIngredient;
}