import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/ingredient';
import { StoreIngredient } from '../models/storeIngredient';
// import { IngredientRequest } from '../models/ingredientRequest';
// import { StoreAmount } from '../models/storeAmount';

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  

  headers = new HttpHeaders({
    'Content-Type':'application/json'
  })

  constructor(private http: HttpClient) { }

  getIngredientAndStores(ingredientId: number) {
    let params = new HttpParams().set("ingredientId", ingredientId.toString());
    return this.http.get<Ingredient>("http://192.168.0.229/api/ingredientAndStores", {headers: this.headers, params: params});
  }

  insertIngredient(storeIngredient: Ingredient) {
    return this.http.post<Ingredient>("http://192.168.0.229/api/insertIngredient", storeIngredient, { headers: this.headers });
  }

  // insertIngredient(ingredient: Ingredient, storeAmounts: StoreAmount[]){
  //   let model = new IngredientRequest(ingredient, storeAmounts);
  //   return this.http.post<Ingredient>("http://192.168.0.229/api/ingredient", model, this.httpOptions);
  // }

  updateIngredient(ingredient: Ingredient) {
    return this.http.put<Ingredient>("http://192.168.0.229/api/updateIngredient", ingredient, {headers: this.headers});
  }
}
