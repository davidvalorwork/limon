import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {Router} from '@angular/router';
import {CategoriaService} from '../../../services/categorias.service'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {CrearComponent} from './crear/crear.component'
import {DesicionComponent} from '../../utils/desicion/desicion.component';
import {EditarComponent} from './editar/editar.component'
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    dataSource:MatTableDataSource<[]>;
    displayedColumns: string[] = ['nombre_categoria', 'estado','options'];
    categorias:any;
    constructor(
        private categoriaService:CategoriaService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        private router:Router,  
        public dialog: MatDialog  
    ){
    }
    buscar(event:any){
        const categories = this.categorias;
        this.dataSource = categories.filter((category:any)=>{
            category.tipo_usuario = this.transformTipoUsuario(category.tiposUsuarioIdTiposUsuarios);
            const categoryS = JSON.stringify(category);
            return categoryS.indexOf(event.target.value)===-1?false:true;
        });

    }
    transformTipoUsuario(id_tipo_usuario:number){
        switch (id_tipo_usuario){
            case 1:
                return "Usuario"
            case 2:
                return "Empresa"
            case 3:
                return "Administrador"
        }
    }
    ngOnInit(){
        this.loadingBar.start()
            this.categoriaService.getCategorias().subscribe((response)=>{
                this.loadingBar.complete();
                this.categorias = response.payload;
                this.dataSource = new MatTableDataSource<[]>(this.categorias);
                this.dataSource.paginator = this.paginator;
                console.log(this.categorias)
            },
            err=>console.log(err));
        
    }
    editar(element:any){
        const dialogRef = this.dialog.open(EditarComponent, {
            width:'400px',
            data:element
        });
        dialogRef.afterClosed().subscribe(result=>{
            this.ngOnInit();
        });
    }
    crear(){
        const dialogRef = this.dialog.open(CrearComponent, {
            width: '400px',
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.ngOnInit()
        });
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
                this.categoriaService.delete(id).subscribe((response:any)=>{
                    this.loadingBar.complete()
                    this.snackBar.success("Categoria eliminada.","")
                    this.ngOnInit();
                })
            }else{
                this.ngOnInit();
            }
            
        });
    }
    setCategoria(id:string){localStorage.setItem('categoria',id)}   
}