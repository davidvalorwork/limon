import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {ProductosService} from '../../../../services/productos.service'
import {SubproductoService} from '../../../../services/subproductos.service'
import {CategoriaService} from '../../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrearSubproductoComponent} from './crear-subproducto/crear-subproducto.component'
import {DesicionComponent} from '../../../utils/desicion/desicion.component';
import {EditarSubproductoComponent} from './editar-subproducto/editar-subproducto.component';
import {StockComponent} from './stock/stock.component'
@Component({
  selector: 'app-subproductos',
  templateUrl: './subproductos.component.html',
  styleUrls: ['./subproductos.component.css']
})
export class SubproductosComponent implements OnInit {
  categorias=[];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  displayedColumns: string[] = ['nombre_subproducto', 'estado','options'];
  productos:any;
  constructor(
      private productoService:ProductosService,
      private subproductoService:SubproductoService,
      private categoriaService:CategoriaService,
      private loadingBar: LoadingBarService,
      private snackBar: SnackBar,
      private router:Router,  
      public dialog: MatDialog  
  ){}
  buscar(event:any){
    const productos = this.productos;
    this.dataSource = productos.filter((producto:any)=>{
      const productoS = JSON.stringify(producto);
      return productoS.indexOf(event.target.value)===-1?false:true;
    });
  }
  ngOnInit(){
    this.loadingBar.start()
    this.subproductoService.getByCondition({
      condicion:{where:{productoIdProductos:localStorage.getItem("producto"),borrado:0}}
    }).subscribe((response)=>{
      this.loadingBar.complete();
      this.productos = response.payload;
      this.dataSource = this.productos
      console.log(this.productos)
      for(let x in this.productos){
        for(let i in this.categorias){
          if(this.categorias[i].id_categorias === this.productos[x].categoriaIdCategorias){
            this.productos[x].categoria = this.categorias[i].nombre_categoria
          }
        }
      }
    },
    err=>console.log(err));
  };
  crear(){
    const dialogRef = this.dialog.open(CrearSubproductoComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  editar(element:any){
    const dialogRef = this.dialog.open(EditarSubproductoComponent,{
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
      this.subproductoService.delete(id).subscribe((response:any)=>{
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
  localStorage.setItem('subproducto',data.id_subproductos)
  this.router.navigate(['/emprendedor/stock'])
}

}
