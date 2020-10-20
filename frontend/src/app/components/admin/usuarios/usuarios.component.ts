import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../services/snackbar.service';
import {UsuarioService} from '../../../services/usuarios.service';
import {Router} from '@angular/router';
// import { DataSource, MatPaginator, Mat} from '@angular/cdk/table';
import {environment} from '../../../../environments/environment'
import {MatDialog} from '@angular/material/dialog';
import { VerPostulacionComponent } from './ver-postulacion/ver-postulacion.component'
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';


@Component({
    selector: 'app-usuarios',
    templateUrl: './usuarios.component.html',
    styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
    @ViewChild(MatPaginator) paginator: MatPaginator;
    // @ViewChild(MatSort) sort: MatSort;
    dataSource:any;
    url_api:string = `${environment.URL_API}/`
    displayedColumns: string[] = [ 'correo', 'rut','telefono','tipo_usuario','options'];
    usuarios:any;
    constructor(
        private usuarioService:UsuarioService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        public dialog: MatDialog,
        private router:Router,    
    ){
       
    }
    buscar(event:any){
        const users = this.usuarios;
        this.dataSource = users.filter((user:any)=>{
            user.tipo_usuario = this.transformTipoUsuario(user.tiposUsuarioIdTiposUsuarios);
            const userS = JSON.stringify(user);
            return userS.indexOf(event.target.value)===-1?false:true;
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
        this.usuarioService.getUsuarios().subscribe((response)=>{
            this.loadingBar.complete();
            this.usuarios = response.payload;
            this.dataSource = new MatTableDataSource<[]>(this.usuarios);
            this.dataSource.paginator = this.paginator;
            console.log(this.usuarios)
        },
        err=>console.log(err));
    }
    

    filtrarPostulaciones(){
        const users = this.usuarios;
        this.dataSource = users.filter((user:any)=>{
            return user.tiposUsuarioIdTiposUsuarios===4?true:false;
        });
    }

    ver(element:any){
        const dialogRef = this.dialog.open(VerPostulacionComponent, {
            width:'100%',
            data:element
        });
        dialogRef.afterClosed().subscribe(result=>{
            this.ngOnInit();
        });
    }

}