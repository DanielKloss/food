import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany} from "typeorm";
import { Recipe } from "./recipe";

@Entity({name: "Instructions"})
export class Instruction {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @ManyToMany(() => Recipe, recipe => recipe.instruction)
    recipe: Recipe[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}