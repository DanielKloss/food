import {Entity, Column, PrimaryColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from "typeorm";
import { Ingredient } from "./Ingredient";
import { Store } from "./store";
import { Unit } from "./unit";

@Entity({name: "StoreIngredients"})
export class StoreIngredient {

    @PrimaryColumn()
    storeId: number;

    @PrimaryColumn()
    ingredientId: number;

    @Column()
    quantity: number;

    @ManyToOne(() => Store, store => store.storeIngredient)
    @JoinColumn({name: "storeId" })
    store: Store
    
    @ManyToOne(() => Ingredient, ingredient => ingredient.recipeIngredient)
    @JoinColumn({name: "ingredientId" })
    ingredient: Ingredient

    @CreateDateColumn()
    createdDate: Date;

    @UpdateDateColumn()
    updatedDate: Date;
}
