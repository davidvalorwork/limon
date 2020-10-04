import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductosService} from '../../../services/productos.service';
import {CategoriaService} from '../../../services/categorias.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import {StockService} from '../../../services/stock.service'
import {SubproductoService} from '../../../services/subproductos.service'
import { SnackBar} from '../../../services/snackbar.service';
import {environment} from '../../../../environments/environment'
import {PagoService} from '../../../services/pagos.service'
import { StockComponent } from '../../emprendedor/productos/subproductos/stock/stock.component';
import { SucursalService } from 'src/app/services/sucursal.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css']
})
export class DetalleProductoComponent implements OnInit {
  product;
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
    public productoService: ProductosService,
    public categoriaService:CategoriaService,
    public snackBar:SnackBar,
    public router:Router,
    public fb :FormBuilder,
    public pagoService:PagoService,
    private stockService:StockService,
    private sucursalService:SucursalService,
    private subproductoService:SubproductoService,
  ) {
    console.log(this.route.snapshot.paramMap.get('id'))
    this.categoriaService.getId(localStorage.getItem('categoria'))
    .subscribe(response=>{
      this.categoria = response.payload
    })
    this.productoService.getByCondition({condicion:{where:{id_productos:this.route.snapshot.paramMap.get('id')}}}).subscribe((response)=>{
      this.product =response.payload[0]
      console.log(this.product)
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
    this.sucursalService.get().subscribe((response:any)=>{
      // this.sucursales = response.payload
      for(let i in response.payload){
        this.stockService.getByCondition({condicion:{where:{
          sucursaleIdSucursales:response.payload[i].id_sucursales,
          borrado:0
        }}}).subscribe((sucursal:any)=>{
          let stock = false
          for(let i in sucursal.payload){
            if(parseInt(sucursal.payload[i].cantidad) > 0){
              stock = true
            }
          }
          if(stock)
          this.sucursales.push(response.payload[i]) 
        }) 
      }
    })
    this.subproductoService.getByCondition({condicion:{where:{
      productoIdProductos:this.route.snapshot.paramMap.get('id')
    }}}).subscribe((response:any)=>{
      this.subproductosBD = response.payload
    })
  }

  ngOnInit(): void {
  }

  anadirCarrito(){
    this.stockService.getByCondition({condicion:{where:{
      sucursaleIdSucursales:this.form.value.sucursal,
      subproductoIdSubproductos:this.form.value.subproducto,
      borrado:0,
    }}}).subscribe((responseStock:any)=>{
      const usuario = JSON.parse(localStorage.getItem('usuario'))
      if(usuario){
        console.log(usuario)
        this.pagoService.create({
          monto:this.precio,
          cantidad:this.cantidad,
          estatus_pago:'Borrador',
          borrado:0,
          stockIdStock:responseStock.payload[0].id_stock,
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
    })
  }
  nuevasucursal(){
    console.log(this.form.value.sucursal)
    console.log(this.subproductosBD)
    this.subproductos = []
    this.form.controls.subproducto.setValue('')
    this.mostrarSubproductos = true
    for(let i in this.subproductosBD){
      this.stockService.getByCondition({condicion:{where:{
        sucursaleIdSucursales:this.form.value.sucursal,
        subproductoIdSubproductos:this.subproductosBD[i].id_subproductos,
        borrado:0
      }}}).subscribe((response:any)=>{
        console.log(response.payload)
        for(let x in response.payload){
          if(response.payload[x].sucursaleIdSucursales === this.form.value.sucursal){
            this.subproductos.push(this.subproductosBD[i])
          }
        }
      })
    }
  }
  ChangeCantidad(event:any){
    let cantidad = event.target.value
    console.log(cantidad)
    this.cantidad = parseInt(cantidad)
    event.preventDefault()
    if(cantidad !== ""){
      // this.lookInPrecios(parseInt(cantidad));
      this.precio = parseInt(cantidad) * this.product.precio
    }else{
      // this.precio = "0"
    }
  }

  nuevoproducto(){
    this.precio = 0
    this.cantidad = 0
    this.stockService.getByCondition({condicion:{where:{
      subproductoIdSubproductos: this.form.value.subproducto,
      sucursaleIdSucursales:this.form.value.sucursal,
      borrado:0,
    }}})
    .subscribe((response:any)=>{
      console.log(response.payload[0])
      this.stock = response.payload[0]
    })
  }

  aumenta(){
    if(parseInt(this.stock.cantidad) > this.cantidad){
      this.cantidad +=1
      this.precio = this.cantidad * this.product.precio
    }else{
      this.snackBar.err("No hay suficiente stock para su demanda","x")
    }
  }
  resta(){
    if(this.cantidad >0){
      this.cantidad -=1
      this.precio = this.cantidad * this.product.precio
    }
  }

  
}
