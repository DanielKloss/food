import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany} from "typeorm";
import { StoreIngredient } from "./storeIngredient";

@Entity({name: "Stores"})
export class Store {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @OneToMany(type => StoreIngredient, storeIngredient => storeIngredient.store)
    storeIngredient: StoreIngredient[];

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}