import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { Store } from '../models/store';
import { RecipeService } from '../services/recipe.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  stores: Store[];
  recipes: Recipe[];

  constructor(private recipeService: RecipeService, private storeService: StoreService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => this.recipes = data);
    this.storeService.getStoresAndQuantities().subscribe(data => {this.stores = data; console.log(data)});
  }
}
