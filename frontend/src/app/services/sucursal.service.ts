import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SucursalService {

  constructor(public http:HttpClient) { }
  
  get(): Observable<any>{
    return this.http.get(`${environment.URL_API}/sucursales/`);
  }

  getByCondition(condition:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/sucursales/condicion`,condition)
  }

  create(producto:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/sucursales/`,producto)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/sucursales/${id}`)
  }

  edit(id:string,producto:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/sucursales/${id}`,producto)
  }
}
