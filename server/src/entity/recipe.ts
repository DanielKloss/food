import {Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable} from "typeorm";
import { Instruction } from "./instruction";
import { RecipeIngredient } from "./recipeIngredient";
import { Tag } from "./tag";

@Entity({name: "Recipes"})
export class Recipe {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    cookingTime: number;

    @OneToMany(type => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
    recipeIngredient: RecipeIngredient;

    @ManyToMany(type => Instruction)
    @JoinTable()
    instruction: Instruction[];

    @ManyToMany(type => Tag)
    @JoinTable()
    tag: Tag[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}