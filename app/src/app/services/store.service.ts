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

  constructor(private http: HttpClient) { }

  getStores() {
    return this.http.get<StoreIngredient[]>("http://192.168.0.229/api/stores");
  }

  getQuantities(): Observable<StoreIngredient[]> {
    return this.http.get<StoreIngredient[]>("http://192.168.0.229/api/quantities");
  }

  getStoresAndQuantities(): Observable<Store[]>{
    return this.http.get<Store[]>("http://192.168.0.229/api/storesAndQuantities");
  }
}
