import {Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable} from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity()
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cookingTime: number;

    @ManyToMany(type => Ingredient, ingredient => ingredient.recipes)
    @JoinTable({ name: 'recipeIngredient', joinColumns:[{name: 'quantity'}] })
    ingredients: Ingredient[];
}