import { Component, OnInit } from '@angular/core';
import {environment} from '../../../environments/environment'

@Component({
  selector: 'app-emprendedor',
  templateUrl: './emprendedor.component.html',
  styleUrls: ['./emprendedor.component.css']
})
export class EmprendedorComponent implements OnInit {
  email:string;
  logo:string;
  user:any;
  url_api:string=`${environment.URL_API}/`;
  constructor() {
    this.user = JSON.parse(localStorage.getItem('usuario'))
    this.email =this.user.correo
    this.logo = this.user.url_logo
    console.log(this.user)
  }

  ngOnInit(): void {
    
  }

  logout(){
    localStorage.clear()
  }

}
