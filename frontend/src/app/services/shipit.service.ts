import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShipitService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Shipit-Email': 'contacto@tiendalimon.cl',
      'X-Shipit-Access-Token': 'XTzE9KEgyxtth_gmvrmb',
      Accept: 'application/vnd.shipit.v2',
    })
  };
  httpOptions2 = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'X-Shipit-Email': 'contacto@tiendalimon.cl',
      'X-Shipit-Access-Token': 'XTzE9KEgyxtth_gmvrmb',
      Accept: 'application/vnd.shipit.v3',
    })
  };

  constructor(public http: HttpClient) { }

  getSucursales(): Observable<any>{
    return this.http.get(`https://api.shipit.cl/v/branch_offices`,this.httpOptions);
  }
  getComunas(): Observable<any>{
    return this.http.get(`https://api.shipit.cl/v/communes`,this.httpOptions);
  }
  getRegiones(): Observable<any>{
    return this.http.get(`https://api.shipit.cl/v/regions`,this.httpOptions);
  }
  consultarPrecio(post: any): Observable<any> {
    return this.http.post(`https://api.shipit.cl/v/prices`,post,this.httpOptions2)
  }
}
