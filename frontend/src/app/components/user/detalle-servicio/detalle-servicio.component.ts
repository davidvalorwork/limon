import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoriaService} from '../../../services/categorias.service'
import {serviciosService} from '../../../services/servicios.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {environment} from '../../../../environments/environment'
import {PagoService} from '../../../services/pagos.service'
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css']
})
export class DetalleServicioComponent implements OnInit {
  servicio;
  subproductos=[];
  stock;
  cantidad:number=0
  subproductosBD=[];
  precio:number= 0;
  sucursales=[];
  mostrarSubproductos:boolean=false
  imageObject: Array<object> = [];
  categoria
  form:FormGroup = this.fb.group({
    sucursal: ['',Validators.required],
    subproducto: ['',Validators.required]
  })

  constructor(
    public route : ActivatedRoute,
    public categoriaService:CategoriaService,
    public snackBar:SnackBar,
    public router:Router,
    public fb :FormBuilder,
    public pagoService:PagoService,
    public servicioServicio:serviciosService,
  ) {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.categoriaService.getId(localStorage.getItem('categoria'))
    .subscribe(response=>{
      this.categoria = response.payload
    })
    this.servicioServicio.getByCondition({condicion:{where:{id_servicios:this.route.snapshot.paramMap.get('id')}}}).subscribe((response)=>{
      this.servicio =response.payload[0]
      console.log(this.servicio)
      const urls = response.payload[0].imagenes.split(",")
      for(let i in urls){
        const image ={
          image:`${environment.URL_API}/${urls[i]}`,
          thumbImage:`${environment.URL_API}/${urls[i]}`,
          alt:"",
        }
        this.imageObject.push(image)
      }
    })
  }

  ngOnInit(): void {
  }

  anadirCarrito(){
    const usuario = JSON.parse(localStorage.getItem('usuario'))
    if(usuario){
      console.log(usuario)
      this.pagoService.create({
        monto:this.servicio.precio,
        estatus_pago:'Borrador',
        borrado:0,
        servicioIdServicios:this.servicio.id_servicios,
        usuarioIdUsuarios:usuario.id_usuarios,
      }).subscribe((response:any)=>{
        console.log(response.payload)
        this.router.navigate(['../../carrito'])
      })
    }else{
      console.log("Sin usuario")
      this.snackBar.err("Por favor registrese.","x")
      this.router.navigate(['../../login'])
    }
  }

}
