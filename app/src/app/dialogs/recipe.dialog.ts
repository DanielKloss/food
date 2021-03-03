import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Instruction } from "../models/description";
import { Ingredient } from "../models/ingredient";
import { Recipe } from "../models/recipe";
import { RecipeIngredient } from "../models/recipeIngredient";
import { Tag } from "../models/tag";

@Component({ 
    selector: 'app-dialog',
    templateUrl: 'recipe.dialog.html',
    styleUrls: ['recipe.dialog.scss']
  })
  export class RecipeDialog {

    name: string;
    ingredients: [number, string][] = [[0,""]];
    instructions: string[] = [""];
    tags: string;
  
    constructor(public dialogRef: MatDialogRef<RecipeDialog>, @Inject(MAT_DIALOG_DATA) public data: Recipe) {
    }
  
    ngOnInit() { }

    addIngredient(){
        this.ingredients.push([0,""]);
    }

    addInstruction(){
        this.instructions.push("");
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
            this.data.recipeIngredient.push(new RecipeIngredient(recipeIngredient[0], new Ingredient(-1, this.capitaliseFirstLetter(recipeIngredient[1]), null!, [])));
        }

        if(this.tags != ""){
            let splitTags = this.tags.split(",");
            for (const tag of splitTags) {
                this.data.tag.push(new Tag(this.capitaliseFirstLetter(tag.trim())));
            }
        }
    }
  }