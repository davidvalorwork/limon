import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {Router} from '@angular/router';
import {CategoriaService} from '../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
// import {CrearComponent} from './crear/crear.component'
import {DesicionComponent} from '../../utils/desicion/desicion.component';
// import {EditarComponent} from './editar/editar.component'
import { MatPaginator } from '@angular/material/paginator';
import{PagoService} from '../../../services/pagos.service'
import { MatTableDataSource } from '@angular/material/table';
import {FlowService} from '../../../services/flow.service'
import {ProductosService} from '../../../services/productos.service'
import {SubproductoService} from '../../../services/subproductos.service'
import {SucursalService} from '../../../services/sucursal.service'
import {StockService} from '../../../services/stock.service'
import {serviciosService} from '../../../services/servicios.service'

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
    // @ViewChild(MatSort) sort: MatSort;
    dataSource:MatTableDataSource<[]>;
    displayedColumns: string[] = ['producto','subproducto','sucursal','monto', 'estado','options'];
    pedidos:any;
    editar:boolean=false;
    monto_total:number;
    constructor(
        private categoriaService:CategoriaService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        private router:Router,  
        private pagoService:PagoService,
        public dialog: MatDialog,
        public flowService:FlowService,
        private sucursalService:SucursalService,
        private subproductoService:SubproductoService,
        private productoService:ProductosService,
        private stockService:StockService,
        private servicioService:serviciosService,
    ){
    }
    buscar(event:any){
        const categories = this.pedidos;
        this.dataSource = categories.filter((category:any)=>{
            const categoryS = JSON.stringify(category);
            return categoryS.indexOf(event.target.value)===-1?false:true;
        });

    }
    ngOnInit(){
        this.loadingBar.start()
            this.pagoService.getByCondition({condicion:{where:{usuarioIdUsuarios:localStorage.getItem("id_usuarios"),borrado:0, estatus_pago:"Borrador"}}}).subscribe((response)=>{
                this.loadingBar.complete();
                // this.setDataSource()
                this.pedidos = response.payload;
                this.setDataSource()
                for(let i in this.pedidos){
                    if(this.pedidos[i].servicioIdServicios){
                        console.log("SERVICIO")
                        this.servicioService.getByCondition({condicion:{where:{
                            id_servicios:this.pedidos[i].servicioIdServicios,
                            borrado:0
                        }}})
                        .subscribe((response:any)=>{
                            console.log(response.payload[0])
                            this.pedidos[i].producto = response.payload[0].nombre_servicio
                            this.pedidos[i].subproducto = `No posee`
                            this.pedidos[i].sucursal = `No posee`
                            this.setDataSource()
                        })
                    }else{
                        this.stockService.getByCondition({condicion:{where:{
                            id_stock:this.pedidos[i].stockIdStock,
                            borrado:0
                        }}})
                        .subscribe((response:any)=>{
                            console.log(response.payload)
                            const stock = response.payload[0]
                            console.log(stock.cantidad)
                            if(parseInt(stock.cantidad) === 0)this.pedidos[i].stock = false
                            this.subproductoService.getByCondition({condicion:{where:{
                                id_subproductos:stock.subproductoIdSubproductos,
                                borrado:0,
                            }}})
                            .subscribe((response:any)=>{
                                this.pedidos[i].subproducto= response.payload[0].nombre_subproducto
                                this.sucursalService.getByCondition({condicion:{where:{
                                    id_sucursales:stock.sucursaleIdSucursales,
                                    borrado:0,
                                }}})
                                .subscribe((response:any)=>{
                                    console.log(response.payload[0].nombre_sucursal)
                                    this.pedidos[i].sucursal= response.payload[0].nombre_sucursal
                                    this.productoService.getByCondition({condicion:{where:{
                                        id_productos:response.payload[0].productoIdProductos,
                                        borrado:0
                                    }}})
                                    .subscribe((response:any)=>{
                                        this.pedidos[i].producto = response.payload[0].nombre_producto
                                        this.setDataSource()
                                    })
                                })
                            })
                        })
                    }
                }
            },
            err=>console.log(err));
        
    }
    setDataSource(){
        this.monto_total = 0 
        this.dataSource = new MatTableDataSource<[]>(this.pedidos);
        this.pedidos.map((pedido)=>{
            this.monto_total = this.monto_total + parseInt(pedido.monto)
        })
        // this.dataSource.paginator = this.paginator;
    }
    eliminar(id:string){
        const dialogRef = this.dialog.open(DesicionComponent, {
            width: '400px',
            data:{text:"¿Desea eliminar esta categoria?"}
          });
      
        dialogRef.afterClosed().subscribe(result => {
            console.log(result)
            if(result==="true"){
                this.loadingBar.start()
                this.pagoService.delete(id).subscribe((response:any)=>{
                    console.log(response.payload)
                    this.loadingBar.complete()
                    this.snackBar.success("Pedido eliminado.","")
                    this.ngOnInit();
                },err=>{
                    console.log(err)
                    this.loadingBar.complete()
                    this.snackBar.err("Error","x")
                })
            }else{
                this.ngOnInit();
            }
            
        });
    }
    pagar(element){
        console.log(element)
        this.flowService.generarLink({monto:element.monto,id_pagos:element.id_pagos})
        .subscribe((response:any)=>{
            console.log(response)
            window.open(response.payload,"_self")
        },err=>{
            this.snackBar.err("Error al contactar con flow","x")
        })
    }

    carritoEditar(){
        this.editar = true
    }
}
