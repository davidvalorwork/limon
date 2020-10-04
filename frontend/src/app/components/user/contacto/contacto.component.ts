import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import {ContactoService} from '../../../services/contacto.service'

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})
export class ContactoComponent implements OnInit {

  form = this.fb.group({
    nombre:[''],
    correo:[''],
    emprendimiento:[''],
    telefono:[''],
    mensaje:[''],
  })

  constructor(
    public fb :FormBuilder,
    public contactoService:ContactoService,
  ) { }

  ngOnInit(): void {}

  enviar(values){
    console.log(values)
    this.contactoService.contactar(values).subscribe((response:any)=>{
      console.log(response.payload)
    })
  }

}
