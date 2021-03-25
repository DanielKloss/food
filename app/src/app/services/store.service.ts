import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store';
import { StoreIngredient } from '../models/storeIngredient';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  url = "http://192.168.1.229/api/";

  constructor(private http: HttpClient) { }

  getStores() {
    return this.http.get<StoreIngredient[]>(this.url + "stores");
  }

  getQuantities(): Observable<StoreIngredient[]> {
    return this.http.get<StoreIngredient[]>(this.url + "quantities");
  }

  getStoresAndQuantities(): Observable<Store[]>{
    return this.http.get<Store[]>(this.url + "storesAndQuantities");
  }
}
