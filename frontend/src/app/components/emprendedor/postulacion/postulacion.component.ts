
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'
import { SnackBar} from '../../../services/snackbar.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import {UploadService} from '../../../services/upload.service'
import {environment} from '../../../../environments/environment'
import { Router } from '@angular/router'
import {Socket} from 'ngx-socket-io'

@Component({
  selector: 'app-postulacion',
  templateUrl: './postulacion.component.html',
  styleUrls: ['./postulacion.component.css']
})
export class PostulacionComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
  @ViewChild("fileUpload2", {static: false}) fileUpload2: ElementRef;

  submit:boolean=false;
  usuarioClaveInvalida:boolean=false;
  empresaClaveInvalida:boolean=false;
  TipoRegistro:number=2;
  foto_perfil = ""
  img_productos = []
  url_api:string=`${environment.URL_API}/`

  // FORMULARIO PARA EMPRESAS
  empresasForm:FormGroup = this.fb.group({
    marca: ['',[Validators.required]],
    razon_social: ['',[Validators.required]],
    rut: ['',[Validators.required]],
    giro: ['',[Validators.required]],
    factura:['',[Validators.required]],
    direccion: ['',[Validators.required,]],
    correo: ['',[Validators.required,Validators.email]],
    nombre_contacto: ['',[Validators.required]],
    telefono_contacto: ['',[Validators.required]],
    url_logo:[''],
    link_video: [''],
    instagram: [''],
    descripcion_negocio:['',[Validators.required]],
    permiso_arriendo:[false],
    permiso_productos:[false],
    permiso_servicio:[false],
    terminos:[false],
    tiposUsuarioIdTiposUsuarios:[4],
    borrado:[0],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: SnackBar,
    private loadingBar: LoadingBarService,
    public uploadService:UploadService,
    private router: Router,
    private socket:Socket,
  ) {}

  ngOnInit(): void {
  }

  // SUBIDA DEL LOGO
  uploadFile(file:any,array:string) { 
    console.log(array)
    const fileData = file;
    let bodyFormData = new FormData();  
    bodyFormData.append("file", fileData,fileData.name);  
    file.inProgress = true;  
    this.loadingBar.start()
    this.uploadService.upload(bodyFormData).subscribe((response:any)=>{
        this.loadingBar.complete()
        this.snackBar.success("Archivo subido.","")
        if(array === 'img_productos'){
          if(this.img_productos.length >3){
            this.snackBar.err("Solo se permite subir hasta 4 productos de muestra", "x")
          }else{
            console.log(this[array])
            this[array].push(response.payload)
          }
        }else{
          this[array] = response.payload
        }
    })
  }

  onClick(cual:number) {  
    if(cual === 1){
      const fileUpload = this.fileUpload.nativeElement;
      fileUpload.onchange = () => {  
          const file = fileUpload.files[0];  
          this.uploadFile(file,'foto_perfil'); 
      };  
      fileUpload.click();  
    }else{
      const fileUpload = this.fileUpload2.nativeElement;
      fileUpload.onchange = () => {  
          const file = fileUpload.files[0];  
          this.uploadFile(file,'img_productos'); 
      };  
      fileUpload.click();  
    }
  }

  // ENVIAR POSTULACION
  postular(form:any){
    form.url_logo = this.foto_perfil
    form.img_productos = this.img_productos.join(",")
    console.log(form)
    if(
      form.permiso_arriendo  === false &&
      form.permiso_servicio === false &&
      form.permiso_productos === false 
    ){
      this.snackBar.err("Elija a cual servicio desea postular.","x")
    }else if(form.terminos === false){
      this.snackBar.err("Es necesario aceptar los terminos y condiciones",'x')
    }else{
      this.submit=true;
      this.loadingBar.start();
      this.authService.crearPostulacion(form).subscribe((response:any)=>{
        this.loadingBar.complete();
        this.submit = false;
        console.log(response)
        if(response.message === "OK"){
          this.snackBar.success("Postulación enviada con éxito.","x")
          this.socket.emit("postulacion")
          this.router.navigate(['../'])
        }
      },
      err=>{
        console.log(err);
        this.snackBar.err(err.error.payload,"")
        this.loadingBar.complete();
        this.submit = false;
      })
    }
  }

}

