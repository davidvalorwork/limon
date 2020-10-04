import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './components/auth/login/login.component';
import { RegistroComponent } from './components/auth/registro/registro.component';
import { RecuperarContrasenaComponent } from './components/auth/recuperar-contrasena/recuperar-contrasena.component';
import { CambioContrasenaComponent } from './components/auth/cambio-contrasena/cambio-contrasena.component';
import { ReactiveFormsModule , FormsModule} from '@angular/forms';
import { LoadingBarModule } from '@ngx-loading-bar/core';
import { HttpClientModule } from '@angular/common/http';
import {MaterialModule} from './material.module'
import {AdminComponent} from './layout/admin/admin.component'
import {UsuarioComponent} from './layout/usuario/usuario.component'
import { from } from 'rxjs';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import {environment} from '../environments/environment'
import { EmprendedorComponent} from './layout/emprendedor/emprendedor.component'
const config: SocketIoConfig = { url: `${environment.URL_SOCKET}`, options: {} };
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistroComponent,
    RecuperarContrasenaComponent,
    CambioContrasenaComponent,
    AdminComponent,
    EmprendedorComponent,
    UsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    FormsModule,
    LoadingBarModule,
    MaterialModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
