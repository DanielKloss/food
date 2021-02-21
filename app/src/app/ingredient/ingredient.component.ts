import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Ingredient } from '../models/ingredient';
import { StoreAmount } from '../models/storeAmount';
import { Unit } from '../models/unit';
import { IngredientService } from '../services/ingredient.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-ingredient',
  templateUrl: './ingredient.component.html',
  styleUrls: ['./ingredient.component.scss']
})
export class IngredientComponent implements OnInit {

  ingredients: Ingredient[];
  ingredientToAdd: Ingredient;
  storeAmountsToAdd: StoreAmount[];
  ingredientAdded: Ingredient;

  constructor(private ingredientService: IngredientService, private storeService: StoreService, private snackBar: MatSnackBar) {
    this.ingredientToAdd = new Ingredient("", new Unit("", ""));
   }

  ngOnInit(): void {
    this.ingredientService.getIngredients().subscribe(data => this.ingredients = data);
    this.storeService.getStores().subscribe(data => this.storeAmountsToAdd = data);
  }

  insertIngredient(): void {
    console.log(this.ingredientToAdd);
    console.log(this.storeAmountsToAdd);
    this.ingredientService.insertIngredient(this.ingredientToAdd, this.storeAmountsToAdd).subscribe(data => {
      this.ingredientAdded = data;
      this.snackBar.open(this.ingredientAdded.name + " Added!", "OK", { duration: 2000 });
      this.ingredientService.getIngredients().subscribe(data => this.ingredients = data);
    });
  }

}
