import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToOne} from "typeorm";
import { RecipeIngredient } from "./recipeIngredient";
import { StoreIngredient } from "./storeIngredient";
import { Unit } from "./unit";

@Entity({name: "Ingredients"})
export class Ingredient {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Unit, unit => unit.ingredient, {cascade: true})
    unit: Unit;

    @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.ingredient)
    recipeIngredient: RecipeIngredient;

    @OneToMany(() => StoreIngredient, storeIngredient => storeIngredient.ingredient)
    storeIngredient: StoreIngredient;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
