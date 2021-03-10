import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Instruction } from "../models/description";
import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";
import { RecipeIngredient } from "../models/recipeIngredient";
import { Tag } from "../models/tag";
import { Unit } from "../models/unit";
import { IngredientService } from "../services/ingredient.service";

@Component({ 
    selector: 'app-dialog',
    templateUrl: 'recipe.dialog.html',
    styleUrls: ['recipe.dialog.scss']
  })
  export class RecipeDialog {

    name: string;
    ingredients: [number, string, string, string][] = [[0,"", "", ""]];
    instructions: string[] = [""];
    tags: string;
  
    allIngredients: Ingredient[];
    allUnits: Unit[];

    constructor(public dialogRef: MatDialogRef<RecipeDialog>, @Inject(MAT_DIALOG_DATA) public data: Recipe, private ingredientService: IngredientService) {
    }

    ngOnInit() { 
        this.ingredientService.getAllIngredients().subscribe(data => this.allIngredients = data);
        this.ingredientService.getAllUnits().subscribe(data => this.allUnits = data);
    }

    addIngredient(){
        this.ingredients.push([0,"", "", ""]);
    }

    addInstruction(){
        this.instructions.push("");
    }

    ingredientChanged(ingredientChangedIndex: number){
        let ingredient = this.allIngredients.find(ingred => ingred.name == this.ingredients[ingredientChangedIndex][1]);

        if (ingredient == undefined){
            return;
        } else {
            this.ingredients[ingredientChangedIndex][2] = ingredient.unit.name;
            this.ingredients[ingredientChangedIndex][3] = ingredient.unit.symbol;
        }
    }

    unitChanged(ingredientChangedIndex: number){
        let unit = this.allUnits.find(unit => unit.name == this.ingredients[ingredientChangedIndex][2]);

        if (unit == undefined){
            return;
        } else {
            this.ingredients[ingredientChangedIndex][3] = unit.symbol;
        }
    }

    symbolChanged(ingredientChangedIndex: number){
        let unit = this.allUnits.find(unit => unit.symbol == this.ingredients[ingredientChangedIndex][3]);

        if (unit == undefined){
            return;
        } else {
            this.ingredients[ingredientChangedIndex][2] = unit.name;
        }
    }
      
    trackByFunctionIngredient(index: number) {
        return index;
    }

    trackByFunctionInstruction(index: number) {
        return index;
    }

    capitaliseFirstLetter(value: string) {
        return value.charAt(0).toUpperCase() + value.slice(1);
    }

    noClick(): void {
      this.dialogRef.close();
    }

    yesClick(): void {
        this.data.name = this.capitaliseFirstLetter(this.name);
        this.data.instruction = [];
        this.data.recipeIngredient = [];
        this.data.tag = [];

        for (const instruction of this.instructions) {
            this.data.instruction.push(new Instruction(this.capitaliseFirstLetter(instruction)));
        }
        
        for (const recipeIngredient of this.ingredients) {
            this.data.recipeIngredient.push(new RecipeIngredient(recipeIngredient[0], new Ingredient(this.capitaliseFirstLetter(recipeIngredient[1]), new Unit(recipeIngredient[2], recipeIngredient[3]), [])));
        }

        if(this.tags != ""){
            let splitTags = this.tags.split(",");
            for (const tag of splitTags) {
                this.data.tag.push(new Tag(this.capitaliseFirstLetter(tag.trim())));
            }
        }
    }
  }