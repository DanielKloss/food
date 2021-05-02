import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  
  url = "http://192.168.1.229/food/api/";

  headers = new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(private http: HttpClient) { }

  getRecipes(): Observable<Recipe[]>{
    return this.http.get<Recipe[]>(this.url + "recipes");
  }

  addRecipe(recipe: Recipe) {
    return this.http.post<Recipe>(this.url + "recipe", recipe, { headers: this.headers });
  }
}
