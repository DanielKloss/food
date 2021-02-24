import { Component, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Ingredient } from "../models/ingredient";

@Component({
    selector: 'app-home',
    templateUrl: 'ingredient.dialog.html',
  })
  export class IngredientDialog {
  
    constructor(public dialogRef: MatDialogRef<IngredientDialog>, @Inject(MAT_DIALOG_DATA) public data: Ingredient) {
    }
  
    noClick(): void {
      this.dialogRef.close();
    }
  }