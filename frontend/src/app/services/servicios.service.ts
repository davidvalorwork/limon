import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class serviciosService {

  constructor(public http:HttpClient) { }
  
  get(): Observable<any>{
    return this.http.get(`${environment.URL_API}/servicios/`);
  }

  getByCondition(condition:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/servicios/condicion`,condition)
  }
  aceptar(json:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/servicios/aceptar`,json)
  }
  rechazar(json:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/servicios/rechazar`,json)
  }

  create(producto:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/servicios/`,producto)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/servicios/${id}`)
  }

  edit(id:string,producto:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/servicios/${id}`,producto)
  }
}
