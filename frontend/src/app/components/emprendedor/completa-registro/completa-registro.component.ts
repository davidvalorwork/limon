import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'
import { SnackBar} from '../../../services/snackbar.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import {UploadService} from '../../../services/upload.service'
import {environment} from '../../../../environments/environment'
import {ActivatedRoute} from '@angular/router';
import { Router } from '@angular/router'
import {Socket} from 'ngx-socket-io'

@Component({
  selector: 'app-completa-registro',
  templateUrl: './completa-registro.component.html',
  styleUrls: ['./completa-registro.component.css']
})
export class CompletaRegistroComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

  submit:boolean=false;
  empresaClaveInvalida:boolean=false;
  TipoRegistro:number=2;
  foto_perfil = ""
  url_api:string=`${environment.URL_API}/`
  usuario:any;

  // FORMULARIO PARA EMPRESAS
  empresasForm:FormGroup = this.fb.group({
    id_usuarios:[],
    url_logo:[''],
    link_video: [''],
    instagram: [''],
    clave:['',Validators.required],
    rclave:['',Validators.required],
    banco:['',Validators.required],
    tipo_cuenta:['',Validators.required],
    numero_cuenta:['',Validators.required],
    titular_cuenta:['',Validators.required],
    rut_cuenta:['',Validators.required],
    correo_banco:['',[Validators.required, Validators.email]],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: SnackBar,
    private loadingBar: LoadingBarService,
    public uploadService:UploadService,
    private router: Router,
    private route:ActivatedRoute,
    private socket:Socket,
  ) {
    this.loadingBar.start()
    this.route.paramMap.subscribe( paramMap => {
      const randomDigit = paramMap.get('id')
      this.authService.getPostulacion(randomDigit).subscribe((response:any)=>{
        console.log(response.payload)
        this.usuario = response.payload;
        this.rellenaFormulario()
        this.loadingBar.complete()
      })
    })
  }

  rellenaFormulario(){
    console.log(this.usuario.url_logo)
    if(this.usuario.url_logo !== null){
      this.foto_perfil = this.usuario.url_logo
    }
    this.empresasForm.controls.url_logo.setValue(this.usuario.url_logo)
    this.empresasForm.controls.link_video.setValue(this.usuario.link_video)
    this.empresasForm.controls.instagram.setValue(this.usuario.instagram)
  }

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
        this[array] = response.payload
    })
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {  
        const file = fileUpload.files[0];  
        this.uploadFile(file,'foto_perfil'); 
    };  
    fileUpload.click();  
  }
  
  // CONTROLADOR EMPRESA
  registrarEmpresa(form:any){
    form.clave !== form.rclave ? this.empresaClaveInvalida=true:this.postular(form);
  }

  // ENVIAR POSTULACION
  postular(form:any){
    form.url_logo = this.foto_perfil
    form.nombre_id = "id_usuarios"
    form.id_usuarios = this.usuario.id_usuarios
    console.log(form)
    if(form.url_logo === ''){
      this.snackBar.err("Suba su logo.","x")
    }else{
      this.submit=true;
      this.loadingBar.start();
      this.authService.actualiza(form).subscribe((response:any)=>{
        this.loadingBar.complete();
        this.submit = false;
        console.log(response)
        if(response.message === "OK"){
          this.snackBar.success("Registro culminado con exito.","x")
          this.router.navigate(['../login'])
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

