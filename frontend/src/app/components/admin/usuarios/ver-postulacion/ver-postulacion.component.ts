import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {environment} from '../../../../../environments/environment'
import {UsuarioService} from '../../../../services/usuarios.service'
import { SnackBar} from '../../../../services/snackbar.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import {Socket} from 'ngx-socket-io'
import {DescriptionComponent} from './description/description.component'
import {MatDialog} from '@angular/material/dialog';
import {CorreosService} from '../../../../services/correos.service'
import { VerProductosComponent } from './ver-productos/ver-productos.component'


@Component({
  selector: 'app-ver-postulacion',
  templateUrl: './ver-postulacion.component.html',
  styleUrls: ['./ver-postulacion.component.css']
})
export class VerPostulacionComponent implements OnInit {

  submit:number=0

  url_api = `${environment.URL_API}/`

  constructor(
    public dialogRef: MatDialogRef<VerPostulacionComponent>,
    private socket:Socket,
    private fb: FormBuilder,
    private usuariosService:UsuarioService,
    private snackBar:SnackBar,
    private loadingBar:LoadingBarService,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private correosService: CorreosService
  ) { }

  ngOnInit(): void {
    // this.disableForm();
  }

  // FORMULARIO PARA EMPRESAS
  empresasForm:FormGroup = this.fb.group({
    marca: [this.data.marca,[Validators.required]],
    razon_social: [this.data.razon_social,[Validators.required]],
    rut: [this.data.rut,[Validators.required]],
    giro: [this.data.giro,[Validators.required]],
    factura:[this.data.factura,[Validators.required]],
    direccion: [this.data.direccion,[Validators.required,]],
    correo: [this.data.correo,[Validators.required,Validators.email]],
    nombre_contacto: [this.data.nombre_contacto,[Validators.required]],
    telefono_contacto: [this.data.telefono_contacto,[Validators.required]],
    url_logo:[this.data.url_logo],
    img_productos:[this.data.img_productos],
    link_video: [this.data.link_video],
    instagram: [this.data.instagram],
    descripcion_negocio:[this.data.descripcion_negocio,[Validators.required]],
    permiso_arriendo:[this.data.permiso_arriendo],
    permiso_productos:[this.data.permiso_productos],
    permiso_servicio:[this.data.permiso_servicio],
    terminos:[false],
    tiposUsuarioIdTiposUsuarios:[4],
    borrado:[0],
  });

  productos(data){
    const dialogRef = this.dialog.open(VerProductosComponent, {
      // width:'400px',
      data:data
    });
  }


  rechazar(id:string){
    console.log(id)
    this.loadingBar.start()
    this.submit = 1
    this.usuariosService.delete(id).subscribe((response:any)=>{
      console.log(response)
      if(response.status === 200){
        this.snackBar.success("Postulación Rechazada",'x')
        this.loadingBar.complete()
        this.socket.emit('postulacion')
        const dialogRef = this.dialog.open(DescriptionComponent, {
          width:'400px',
          data:this.data
        });
        this.dialogRef.close()
      }else{
        this.snackBar.err('Error al rechazar la postulacion',"x")
        this.loadingBar.complete()
      }
    })
  }
  aceptar(){
    this.loadingBar.start()
    this.submit = 1
    this.correosService.postulacionAceptada(this.data).subscribe((response:any)=>{
      console.log(response)
      this.snackBar.success("Correo enviado","X")
      this.dialogRef.close()
      this.loadingBar.complete()
      this.socket.emit('postulacion')
    },
    err=>{
      console.log(err)
      this.submit = 0
      this.snackBar.err(err.statusText,"x")
    })
  }
}
