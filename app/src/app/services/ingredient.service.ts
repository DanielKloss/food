import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { StoreIngredient } from '../models/storeIngredient';
import { Unit } from '../models/unit';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  url = "http://192.168.1.229/food/api/";

  headers = new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(private http: HttpClient) { }

  getAllIngredients() {
    return this.http.get<Ingredient[]>(this.url + "ingredients");
  }

  getAllUnits() {
    return this.http.get<Unit[]>(this.url + "units");
  }

  getIngredientAndStores(ingredientId: number) {
    let params = new HttpParams().set("ingredientId", ingredientId.toString());
    return this.http.get<Ingredient>(this.url + "ingredientAndStores", {headers: this.headers, params: params});
  }

  insertIngredient(storeIngredient: Ingredient) {
    return this.http.post<Ingredient>(this.url + "insertIngredient", storeIngredient, { headers: this.headers });
  }

  updateIngredient(ingredient: Ingredient) {
    return this.http.put<Ingredient>(this.url + "updateIngredient", ingredient, {headers: this.headers});
  }

  updateIngredientStock(stock: StoreIngredient) {
    return this.http.put<StoreIngredient>(this.url + "updateStockIngredient", stock, { headers: this.headers });
  }
}
