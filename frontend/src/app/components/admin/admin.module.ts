import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminRoutes } from './admin.routing';
import {DashboardComponent} from './dashboard/dashboard.component'
import { UsuariosComponent} from './usuarios/usuarios.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CrearComponent } from './categorias/crear/crear.component';
import { ProductosComponent } from './productos/productos.component';
import {CrearProductoComponent} from './productos/crear/crear.component';
import {DesicionComponent} from '../utils/desicion/desicion.component';
import {EditarComponent} from './categorias/editar/editar.component'
import {EditarProductoComponent} from './productos/editar/editar.component';
import { VerComponent } from './productos/ver/ver.component';
import { PerfilComponent } from './perfil/perfil.component';
import { VerPostulacionComponent } from './usuarios/ver-postulacion/ver-postulacion.component';
import { DescriptionComponent } from './usuarios/ver-postulacion/description/description.component';
import { VerProductosComponent } from './usuarios/ver-postulacion/ver-productos/ver-productos.component';
import { ServiciosComponent } from './servicios/servicios.component'
import {VerServiciosComponent} from './servicios/ver/ver.component';
import { SucursalesComponent } from './sucursales/sucursales.component'
import {CrearSucursalComponent} from './sucursales/crear/crear.component'
import {EditarSucursalComponent} from './sucursales/editar/editar.component'

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    CdkTableModule,
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [],
  declarations: [
    DashboardComponent,
    EditarComponent,
    EditarSucursalComponent,
    CrearSucursalComponent,
    CrearProductoComponent,
    UsuariosComponent,
    EditarProductoComponent,
    CategoriasComponent,
    CrearComponent,
    VerServiciosComponent,
    ProductosComponent,
    DesicionComponent,
    VerComponent,
    PerfilComponent,
    VerPostulacionComponent,
    DescriptionComponent,
    VerProductosComponent,
    ServiciosComponent,
    SucursalesComponent
  ]
})
export class AdminComponentsModule {}
