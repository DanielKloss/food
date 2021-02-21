import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient';
import { StoreAmount } from '../models/storeAmount';

export class InsertIngredientModel {
  constructor(
    public ingredient: Ingredient,
    public storeAmounts: StoreAmount[]
  ){}
}

@Injectable({
  providedIn: 'root'
})
export class IngredientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient) { }

  getIngredients() {
    return this.http.get<Ingredient[]>("http://192.168.0.229/api/ingredients");
  }

  insertIngredient(ingredient: Ingredient, storeAmounts: StoreAmount[]){
    let model = new InsertIngredientModel(ingredient, storeAmounts);
    console.log(model);
    return this.http.post<Ingredient>("http://192.168.0.229/api/ingredient", model, this.httpOptions);
  }
}
