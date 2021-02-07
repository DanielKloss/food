import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Unique, ManyToOne} from "typeorm";
import { RecipeIngredient } from "./recipeIngredient";
import { Unit } from "./unit";

@Entity({name: "Ingredients"})
export class Ingredient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(type => Unit, unit => unit.ingredient)
    unit: Unit;

    @OneToMany(type => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
    recipeIngredient: RecipeIngredient;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
