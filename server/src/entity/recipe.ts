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

    @OneToMany(() => RecipeIngredient, recipeIngredient => recipeIngredient.recipe)
    recipeIngredient: RecipeIngredient[];

    @ManyToMany(() => Instruction, instruction => instruction.recipe)
    @JoinTable({name: "RecipeInstructions"})
    instruction: Instruction[];

    @ManyToMany(() => Tag, tag => tag.recipe)
    @JoinTable({name: "RecipeTags"})
    tag: Tag[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}