import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>("http://192.168.0.229/api/recipes");
  }

  addRecipe(recipe: Recipe) {
    return this.http.post<Recipe>("http://192.168.0.229/api/recipe", recipe);
  }
}
