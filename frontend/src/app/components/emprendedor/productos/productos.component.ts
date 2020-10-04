
import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {ProductosService} from '../../../services/productos.service'
import {CategoriaService} from '../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrearProductoComponent} from './crear/crear.component'
import {DesicionComponent} from '../../utils/desicion/desicion.component';
import {EditarProductoComponent} from './editar/editar.component'
import { VerComponent } from './ver/ver.component'
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {
  categorias=[];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  displayedColumns: string[] = ['nombre_producto', "categoria",'estado','options'];
  productos:any;
  constructor(
      private productoService:ProductosService,
      private categoriaService:CategoriaService,
      private loadingBar: LoadingBarService,
      private snackBar: SnackBar,
      private router:Router,  
      public dialog: MatDialog  
  ){
    this.categoriaService.getCategorias().subscribe((response:any)=>{
      this.categorias = response.payload
    })
  }
  buscar(event:any){
      const productos = this.productos;
      this.dataSource = productos.filter((producto:any)=>{
          const productoS = JSON.stringify(producto);
          return productoS.indexOf(event.target.value)===-1?false:true;
      });

  }
  ngOnInit(){
    this.loadingBar.start()
    this.productoService.getByCondition({
      condicion:{where:{usuarioIdUsuarios:localStorage.getItem("id_usuarios"),borrado:0}}
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
    const dialogRef = this.dialog.open(CrearProductoComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  editar(element:any){
    const dialogRef = this.dialog.open(EditarProductoComponent,{
      width:'80%',
      data:element
    })
    dialogRef.afterClosed().subscribe(result=>{
      this.ngOnInit();
    })
  }
  ver(element:any){
    const dialogRef = this.dialog.open(VerComponent,{
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
      this.productoService.delete(id).subscribe((response:any)=>{
        this.loadingBar.complete()
        this.snackBar.success("Producto eliminada.","")
        this.ngOnInit();
      })
      this.ngOnInit();
    }else{
      this.ngOnInit();
    }
  });
}

  goSubproductos(datos){
    console.log(datos)
    localStorage.setItem('producto',datos.id_productos)
    this.router.navigate(['/emprendedor/subproductos'])
  }
}
