import { Pipe, PipeTransform } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RecipeDialog } from '../dialogs/recipe.dialog';
import { Recipe } from '../models/recipe';
import { StoreIngredient } from '../models/storeIngredient';
import { RecipeService } from '../services/recipe.service';
import { StoreService } from '../services/store.service';

@Pipe({name: 'formatCookingTimeLabel'})
export class FormatCookingTimeLabel implements PipeTransform {
  transform(value: number): string {
    if (value >= 60) {
      var hours = Math.floor(value / 60);          
      var minutes = value % 60;
      return hours + ' hours' + minutes + ' minutes'; 
    }

    return value + ' minutes';
  }
}

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.scss']
})
export class RecipeComponent implements OnInit {

  allRecipes: Recipe[];
  recipes: Recipe[];
  storeIngredients: StoreIngredient[];
  searchTerm: string;
  haveIngredients: boolean;
  minCookingTime: number;
  maxCookingTime: number;
  cookingTime: number;

  constructor(private recipeService: RecipeService, private storeService: StoreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getAllRecipes();
    this.storeService.getQuantities().subscribe(data => {this.storeIngredients = data});
  }

  getAllRecipes(): void {
    this.recipeService.getRecipes().subscribe(data => { 
      this.allRecipes = data;
      this.recipes = this.allRecipes; 
      this.maxCookingTime = 10
      this.minCookingTime = 1
      this.cookingTime = this.maxCookingTime;
    });
  }

  findMinCookingTime(): number{
    let lowest = this.maxCookingTime;
    for (const recipe of this.allRecipes) {
      if (recipe.cookingTime < lowest){
        lowest = recipe.cookingTime;
      }
    }
    return lowest;
  }

  findMaxCookingTime(): number{
    let highest = 1;
    for (const recipe of this.allRecipes) {
      if (recipe.cookingTime > highest){
        highest = recipe.cookingTime;
      }
    }
    return highest;
  }

  addRecipe(){
    const dialogRef = this.dialog.open(RecipeDialog, {
      width: '450px',
      data: new Recipe("", 0, [], [], [])
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.getAllRecipes();
      }
    });
  }

  filterChanged(){
    if (this.searchTerm == "" && !this.haveIngredients && this.cookingTime == this.maxCookingTime){
      this.recipes = this.allRecipes;
      return;
    }

    this.searchByTerm();
    this.searchByCookingTime();
    this.searchByHasIngredients();
  }

  searchByTerm(){
    if (this.searchTerm == "" || this.searchTerm == undefined){
      this.recipes = this.allRecipes;
    } else {
      this.recipes = this.allRecipes.filter((recipe) => {
        return recipe.name.includes(this.searchTerm) || 
        recipe.tag.some((tag) => { return tag.name.includes(this.searchTerm) }) || 
        recipe.recipeIngredient.some((ingredient) => { return ingredient.ingredient.name.includes(this.searchTerm) });
      });
    }
  }

  searchByCookingTime(){
    this.recipes = this.recipes.filter((recipe) => recipe.cookingTime <= this.cookingTime);
  }

  searchByHasIngredients(){
    if (this.haveIngredients){
      for (let i = this.recipes.length - 1; i >= 0; i--){
        for (const recipeIngredient of this.recipes[i].recipeIngredient) {
          if(this.storeIngredients.some(s => s.ingredientId == recipeIngredient.ingredient.id && s.quantity >= recipeIngredient.quantity)) {
            continue;
          } else {
            this.recipes.splice(i,1);
            break;
          }
        }
      }
    }
  }

  formatCookingTimeLabel(value: number) {
    if (value >= 60) {
      var hours = Math.floor(value / 60);          
      var minutes = value % 60;
      return hours + 'h' + minutes + 'm'; 
    }

    return value + 'm';
  }
}
