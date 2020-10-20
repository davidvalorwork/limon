import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {

  constructor(public http:HttpClient) { }
  
  getCarrito(id): Observable<any>{
    return this.http.get(`${environment.URL_API}/carrito/${id}`);
  }
  create(post): Observable<any>{
    return this.http.post(`${environment.URL_API}/carrito`,post);
  }
  actualizar(post): Observable<any>{
    return this.http.put(`${environment.URL_API}/carrito`,post);
  }
}
