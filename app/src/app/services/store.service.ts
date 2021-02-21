import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '../models/store';

@Injectable({
  providedIn: 'root'
})
export class StoreService {

  constructor(private http: HttpClient) { }

  getStores(): Observable<Store[]>{
    return this.http.get<Store[]>("http://192.168.0.229/api/stores");
  }
}
