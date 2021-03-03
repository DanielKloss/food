import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IngredientDialog } from '../dialogs/ingredient.dialog';
import { Ingredient } from '../models/ingredient';
import { IngredientStore } from '../models/ingredientStore';
import { Store } from '../models/store';
import { StoreIngredient } from '../models/storeIngredient';
import { Unit } from '../models/unit';
import { IngredientService } from '../services/ingredient.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.scss']
})
export class StoreComponent implements OnInit {

  stores: Store[];

  constructor(private storeService: StoreService, private ingredientService: IngredientService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.storeService.getStoresAndQuantities().subscribe(data => this.stores = data);
  }

  openIngredientChange(ingredientToChange: StoreIngredient): void {
    this.ingredientService.getIngredientAndStores(ingredientToChange.ingredient.id).subscribe(data => {
      for (const store of this.stores) {
        if(data.storeIngredient.find(s => s.store.name == store.name)==undefined){
          data.storeIngredient.push(new IngredientStore(0, new Store(store.id, store.name, [])));
        }
      }

      const dialogRef = this.dialog.open(IngredientDialog, {
        width: '300px',
        data: data
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if(result != undefined){
          this.ingredientService.updateIngredient(result).subscribe(() => {
            this.storeService.getStoresAndQuantities().subscribe(data => this.stores = data);
          });
        }
      });
     }); 
  }

  addIngredient(storeToAddTo: Store): void {
    const dialogRef = this.dialog.open(IngredientDialog, {
      width: '300px',
      data: new Ingredient(0, "", new Unit("", ""), [new IngredientStore(0, storeToAddTo)])
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.ingredientService.insertIngredient(result).subscribe(() => {
          this.storeService.getStoresAndQuantities().subscribe(data => this.stores = data);
        });
      }
    });
  }
}
