import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {

  constructor(public http:HttpClient) { }
  
  contactar(info:any): Observable<any>{
    return this.http.post(`${environment.URL_API}/contacto`,info);
  }

}
