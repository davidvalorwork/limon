import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CorreosService {

  constructor(public http:HttpClient) { }
  
  route:string=`${environment.URL_API}/correos`

  postulacionRechazada(body:any){
    return this.http.post(`${this.route}/postulacion-rechazada`,body)
  }

  postulacionAceptada(body:any){
    return this.http.post(`${this.route}/postulacion-aceptada`,body)
  }

}
