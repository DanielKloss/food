import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { RecipeIngredient } from "./recipeIngredient";
import { StoreIngredient } from "./storeIngredient";

@Entity({name: "Units"})
export class Unit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @OneToMany(type => RecipeIngredient, recipeIngredient => recipeIngredient.unit)
    recipeIngredient: RecipeIngredient;

    @OneToMany(type => StoreIngredient, storeIngredient => storeIngredient.unit)
    storeIngredient: StoreIngredient;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}