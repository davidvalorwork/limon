import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service'
import { SnackBar} from '../../../services/snackbar.service'
import { LoadingBarService } from '@ngx-loading-bar/core';
import { Router } from '@angular/router'

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  submit:boolean=false;
  usuarioClaveInvalida:boolean=false;
  empresaClaveInvalida:boolean=false;
  TipoRegistro:number=1;
  // FORMULARIO PARA USUARIOS
  usuariosForm:FormGroup = this.fb.group({
    usuario: ['',[Validators.required]],
    clave: ['',[Validators.required]],
    rclave: ['',[Validators.required]],
    nombres: ['',[Validators.required]],
    apellidos: ['',[Validators.required]],
    rut: ['',[Validators.required]],
    telefono: ['',[Validators.required]],
    correo: ['',[Validators.required,Validators.email]],
    tipo_usuario:[1],
    borrado:[0],
  });
  // FORMULARIO PARA EMPRESAS
  empresasForm:FormGroup = this.fb.group({
    usuario: ['',[Validators.required]],
    clave: ['',[Validators.required]],
    rclave: ['',[Validators.required]],
    rut: ['',[Validators.required]],
    telefono: ['',[Validators.required]],
    correo: ['',[Validators.required,Validators.email]],
    razon_social: ['',[Validators.required]],
    giro: ['',[Validators.required]],
    nombre_fantasia: ['',[Validators.required]],
    tipo_usuario:[2],
    borrado:[0],
  });

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private snackBar: SnackBar,
    private loadingBar: LoadingBarService,
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  // CONTROLADOR USUARIO
  registrarUsuario(form:any){
    form.clave !== form.rclave ? this.usuarioClaveInvalida=true:this.registrar(form);
  }
  
  // CONTROLADOR EMPRESA
  registrarEmpresa(form:any){
    form.clave !== form.rclave ? this.empresaClaveInvalida=true:this.registrar(form);
  }

  // REGISTRAR USUARIO
  registrar(form:any){
    console.log(form)
    this.submit=true;
    this.loadingBar.start();
    this.authService.crearUsuario(form).subscribe((response)=>{
      this.loadingBar.complete();
      this.submit = false;
      console.log(response)
      if(response.message === "OK"){
        this.snackBar.success("Usuario registrado con éxito.","")
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
