import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { AuthService } from '../../../services/auth.service'
import { SnackBar} from '../../../services/snackbar.service'
import {Router} from '@angular/router'
import { Socket } from 'ngx-socket-io';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submit:boolean=false;
  // LOGIN  FORM
  loginForm:FormGroup = this.fb.group({
    usuario:['', Validators.required],
    clave:['', Validators.required],
  })

  constructor(
    private fb: FormBuilder,
    private socket: Socket,
    private loadingBar: LoadingBarService,
    private authService: AuthService,
    private snackBar: SnackBar,
    private router:Router,
  ) { }

  ngOnInit(): void {
  }

  // CONTROLADOR DE LOGIN
  login(form:any){
    this.submit=true;
    this.loadingBar.start();
    this.authService.login(form).subscribe((response)=>{
      console.log(response)
      this.loadingBar.complete();
      this.submit = false;
      if(response.message === "OK"){
        console.log(response)
        this.socket.emit('login',response.payload)
        localStorage.setItem("token",response.payload.token);
        localStorage.setItem("id_usuarios",response.payload.usuario.id_usuarios)
        localStorage.setItem("usuario",JSON.stringify(response.payload.usuario))
        this.snackBar.success(`Bienvenido ${response.payload.tipo_usuario ===3?'Administrador':''}`,"")
        if(response.payload.tipo_usuario ===3){
          this.router.navigate(['/admin'])
        }else if(response.payload.tipo_usuario ===2){
          this.router.navigate(['/emprendedor'])
        }
        else this.router.navigate(['../'])
      }
    },
    (err)=>{
      console.log(err)
      err.error.status === 500?this.snackBar.err("Credenciales Invalidas",""):null;
      this.submit=false;
      this.loadingBar.complete();
    });
  
  }

}
