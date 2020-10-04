

import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {serviciosService} from '../../../services/servicios.service'
import {CategoriaService} from '../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrearServicioComponent} from './crear-servicio/crear-servicio.component'
import {DesicionComponent} from '../../utils/desicion/desicion.component';
// import {EditarProductoComponent} from './editar/editar.component'
// import { VerComponent } from './ver/ver.component'
@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  categorias=[];

  // @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ViewChild(MatSort) sort: MatSort;
  dataSource:any;
  displayedColumns: string[] = ['nombre_producto','descripcion_producto','precio', 'direccion' ,'categoria','estado','options'];
  servicios:any;
  constructor(
      private serviciosService:serviciosService,
      private categoriaService:CategoriaService,
      private loadingBar: LoadingBarService,
      private snackBar: SnackBar,
      private router:Router,  
      public dialog: MatDialog  
  ){}
  buscar(event:any){
      const servicios = this.servicios;
      this.dataSource = servicios.filter((producto:any)=>{
          const servicios = JSON.stringify(producto);
          return servicios.indexOf(event.target.value)===-1?false:true;
      });
  }
  ngOnInit(){
    this.loadingBar.start()
    this.serviciosService.getByCondition({
      condicion:{where:{usuarioIdUsuarios:localStorage.getItem("id_usuarios"),borrado:0}}
    }).subscribe((response)=>{
        this.loadingBar.complete();
        this.servicios = response.payload;
        this.dataSource = this.servicios
        console.log(this.servicios)
    },
    err=>console.log(err));
  };
  crear(){
    const dialogRef = this.dialog.open(CrearServicioComponent, {
      width: '80%',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }
  editar(element:any){
    // const dialogRef = this.dialog.open(EditarProductoComponent,{
    //   width:'80%',
    //   data:element
    // })
    // dialogRef.afterClosed().subscribe(result=>{
    //   this.ngOnInit();
    // })
  }
  ver(element:any){
    // const dialogRef = this.dialog.open(VerComponent,{
    //   width:'400px',
    //   data:element
    // })
    // dialogRef.afterClosed().subscribe(result=>{
    //   this.ngOnInit();
    // })
  }
  eliminar(id:string){
  const dialogRef = this.dialog.open(DesicionComponent, {
    width: '400px',
    data:{text:"¿Desea eliminar este servicio?"}
  });

  dialogRef.afterClosed().subscribe(result => {
    // console.log(result)
    if(result==="true"){
      this.loadingBar.start()
      this.serviciosService.delete(id).subscribe((response:any)=>{
        this.loadingBar.complete()
        this.snackBar.success("Servicio eliminado.","")
        this.ngOnInit();
      })
      this.ngOnInit();
    }else{
      this.ngOnInit();
    }
  });
}
}
