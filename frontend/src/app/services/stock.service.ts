import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(public http:HttpClient) { }
  
  get(): Observable<any>{
    return this.http.get(`${environment.URL_API}/stock/`);
  }

  getByCondition(condition:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/stock/condicion`,condition)
  }

  create(producto:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/stock/`,producto)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/stock/${id}`)
  }

  edit(id:string,producto:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/stock/${id}`,producto)
  }
}
