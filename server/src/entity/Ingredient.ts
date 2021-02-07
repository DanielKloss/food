import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, Unique} from "typeorm";
import { RecipeIngredient } from "./recipeIngredient";

@Entity({name: "Ingredients"})
@Unique("UniqueIgredientName", ["name"])
export class Ingredient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
    recipeIngredient: RecipeIngredient;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
