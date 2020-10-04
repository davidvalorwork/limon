import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService {

  constructor(public http:HttpClient) { }
  
  getCategorias(): Observable<any>{
    return this.http.get(`${environment.URL_API}/categorias/`);
  }

  getId(id:string): Observable<any>{
    return this.http.get(`${environment.URL_API}/categorias/${id}`)
  }
  getByCondition(condition): Observable<any>{
    return this.http.post(`${environment.URL_API}/categorias/condicion`,condition)
  }

  createCategorias(categoria:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/categorias/`,categoria)
  }

  delete(id:string):Observable<any>{
    return this.http.delete(`${environment.URL_API}/categorias/${id}`)
  }
  
  editar(id:string,categoria:any):Observable<any>{
    return this.http.post(`${environment.URL_API}/categorias/${id}`,categoria)
  }
}
