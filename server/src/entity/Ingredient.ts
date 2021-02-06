import {Entity, PrimaryGeneratedColumn, Column, ManyToMany} from "typeorm";
import { Recipe } from "./recipe";

@Entity()
export class Ingredient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => Recipe, recipe => recipe.ingredients)
    recipes: Recipe[];
}
