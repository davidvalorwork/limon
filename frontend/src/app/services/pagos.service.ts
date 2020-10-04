import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PagoService {

  constructor(public http:HttpClient) { }
  
  get(): Observable<any>{
    return this.http.get(`${environment.URL_API}/pagos/`);
  }

  getId(id:string): Observable<any>{
    return this.http.get(`${environment.URL_API}/pagos/${id}`)
  }

  getByCondition(condition:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/pagos/condicion`,condition)
  }

  create(categoria:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/pagos/`,categoria)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/pagos/${id}`)
  }
  
  editar(id:string,categoria:any):Observable<any>{
    return this.http.post(`${environment.URL_API}/pagos/${id}`,categoria)
  }
}
