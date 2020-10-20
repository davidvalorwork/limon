import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../../services/snackbar.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {StockService} from '../../../../../services/stock.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrearStockComponent} from './crear-stock/crear-stock.component'
import {DesicionComponent} from '../../../../utils/desicion/desicion.component';
import {EditarStockComponent} from './editar-stock/editar-stock.component'
import {SucursalService} from '../../../../../services/sucursal.service'
import {ShipitService} from '../../../../../services/shipit.service'
@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  categorias=[];
  sucursales=[];
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  displayedColumns: string[] = ['nombre_subproducto', 'sucursal','estado','options'];
  productos:any;
  constructor(
      private stockService:StockService,
      private loadingBar: LoadingBarService,
      private snackBar: SnackBar,
      private router:Router,  
      public dialog: MatDialog,
      private shipitService:ShipitService,
      private sucursalService:SucursalService,  
  ){}
  buscar(event:any){
    const productos = this.productos;
    this.dataSource = productos.filter((producto:any)=>{
      const productoS = JSON.stringify(producto);
      return productoS.indexOf(event.target.value)===-1?false:true;
    });
  }
  getSucursalesShipit(){
    this.shipitService.getSucursales().subscribe((res)=>{
      this.sucursales = res
      console.log(res)
      this.getStock()
    })
  }
  getStock(){
    this.stockService.getByCondition({
      condicion:{where:{subproductoIdSubproductos:localStorage.getItem("subproducto"),borrado:0}}
    }).subscribe((response)=>{
      this.loadingBar.complete();
      this.productos = response.payload;
      this.dataSource = this.productos
      console.log(this.productos)
      for(let x in this.productos){
        for(let i in this.sucursales){
          console.log(this.sucursales[i].id)
          console.log(this.productos[x].id_sucursal)
          if(this.sucursales[i].id === this.productos[x].id_sucursal){
            this.productos[x].sucursal = this.sucursales[i].name
          }
        }
      }
    },
    err=>console.log(err));
  }
  ngOnInit(){
    // this.sucursalService.get().subscribe((response:any)=>{
    //   this.sucursales = response.payload
    // })
    this.loadingBar.start()
    this.getSucursalesShipit()
    
  };
  crear(){
    const dialogRef = this.dialog.open(CrearStockComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  editar(element:any){
    const dialogRef = this.dialog.open(EditarStockComponent,{
      width:'400px',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  
  eliminar(id:string){
  const dialogRef = this.dialog.open(DesicionComponent, {
    width: '400px',
    data:{text:"¿Desea eliminar este producto?"}
  });

  dialogRef.afterClosed().subscribe(result => {
    // console.log(result)
    if(result==="true"){
      this.loadingBar.start()
      this.stockService.delete(id).subscribe((response:any)=>{
        this.loadingBar.complete()
        this.snackBar.success("Subproducto eliminado.","")
        this.ngOnInit();
      })
      this.ngOnInit();
    }else{
      this.ngOnInit();
    }
  });
}

stock(data){
  console.log(data)
  this.dialog.open(StockComponent,{width:"400px",data})
}

}
