import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { Ingredient } from "./Ingredient";

@Entity({name: "Units"})
export class Unit {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    symbol: string;

    @OneToMany(type => Ingredient, ingredient => ingredient.unit, {cascade: ['insert']})
    ingredient: Ingredient;

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}