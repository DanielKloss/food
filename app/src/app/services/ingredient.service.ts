import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  headers = new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(private http: HttpClient) { }

  getAllIngredients() {
    return this.http.get<Ingredient[]>("http://192.168.0.229/api/ingredients");
  }

  getAllUnits() {
    return this.http.get<Unit[]>("http://192.168.0.229/api/units");
  }

  getIngredientAndStores(ingredientId: number) {
    let params = new HttpParams().set("ingredientId", ingredientId.toString());
    return this.http.get<Ingredient>("http://192.168.0.229/api/ingredientAndStores", {headers: this.headers, params: params});
  }

  insertIngredient(storeIngredient: Ingredient) {
    return this.http.post<Ingredient>("http://192.168.0.229/api/insertIngredient", storeIngredient, { headers: this.headers });
  }

  updateIngredient(ingredient: Ingredient) {
    return this.http.put<Ingredient>("http://192.168.0.229/api/updateIngredient", ingredient, {headers: this.headers});
  }
}
