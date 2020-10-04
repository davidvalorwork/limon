import { Component, OnInit } from '@angular/core';
import {ProductosService} from '../../../services/productos.service'
import {CategoriaService} from '../../../services/categorias.service'
import {environment} from '../../../../environments/environment'
import {Router} from '@angular/router'
import {SubproductoService} from '../../../services/subproductos.service'
import {StockService} from '../../../services/stock.service'
import {serviciosService} from '../../../services/servicios.service'
import { StockComponent } from '../../emprendedor/productos/subproductos/stock/stock.component';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-detalle-categoria',
  templateUrl: './detalle-categoria.component.html',
  styleUrls: ['./detalle-categoria.component.css']
})
export class DetalleCategoriaComponent implements OnInit {

  productos=[];
  servicios=[]
  servicio:boolean=false
  categoria:any;
  sinProductos:boolean=true
  url_api:string= environment.URL_API+"/";

  constructor(
    private productoService:ProductosService,
    private categoriaService:CategoriaService,
    private router:Router,
    private stockService:StockService,
    private subproductoService:SubproductoService,
    private servicioService:serviciosService,
  ) {
    this.categoriaService.getId(localStorage.getItem("categoria"))
    .subscribe((response:any)=>{
      this.categoria = response.payload
      if(this.categoria.type){
        console.log("SERVICIO")
        this.servicio = true
        this.setServicios()
      }else{
        console.log("PRODUCTOS")
        this.setProductos()
      }
      // console.log(response.payload)
    })
    
  }
  ngOnInit(): void {
  }

  goProducto(id:string){
    console.log(id)
    setTimeout(()=>{
      this.router.navigate([`/detalle-producto/${id}`])
    },200)
  }
  goServicio(id:string){
    console.log(id)
    setTimeout(()=>{
      this.router.navigate([`/detalle-servicio/${id}`])
    },200)
  }


  setServicios(){
    this.servicioService.getByCondition({condicion:{where:{
      categoriaIdCategorias:localStorage.getItem("categoria"),borrado:0,estado:'Aceptado'
    }}})
    .subscribe((response:any)=>{
      console.log(response)
      if(response.payload.length !== 0 ){
        this.sinProductos = false
        const servicios = response.payload
        for(let i in servicios){
          servicios[i].imagenes = servicios[i].imagenes.split(',')
          servicios[i].imagenes = servicios[i].imagenes[0]
        }
        this.servicios = servicios
      }
    })
  }


  setProductos(){
    this.productoService.getByCondition({condicion:{where:{categoriaIdCategorias:localStorage.getItem("categoria"),borrado:0,estado:'Aceptado'}}})
    .subscribe((response:any)=>{
      // console.log(response.payload)
      if(response.payload.length !== 0){
        this.sinProductos = false;
        const productos =response.payload
        for(let i in productos){
          productos[i].imagenes =productos[i].imagenes.split(',')
          productos[i].imagenes = productos[i].imagenes[0]
          this.subproductoService.getByCondition({condicion:{where:{
            productoIdProductos:productos[i].id_productos,borrado:0
          }}}).subscribe((response:any)=>{
            for(let x in response.payload){
              this.stockService.getByCondition({condicion:{where:{
                subproductoIdSubproductos:response.payload[x].id_subproductos
              }}}).subscribe((response:any)=>{
                console.log(response.payload)
                let haveStock = false
                for(let i in response.payload){
                  let cantidad = parseInt(response.payload[i].cantidad)
                  if(cantidad>0)haveStock=true
                }
                if(haveStock && this.productos.indexOf(productos[i]) === -1){
                  console.log(productos[i])
                  this.productos.push(productos[i])
                }
                
              })
            }
          })
        }
      }
    })
  }

}
