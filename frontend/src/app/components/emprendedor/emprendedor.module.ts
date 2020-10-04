import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { EmprendedorRoutes } from './emprendedor.routing';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { RegistroComponent } from './registro/registro.component';
import { CompletaRegistroComponent } from './completa-registro/completa-registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { CrearProductoComponent } from './productos/crear/crear.component';
import {EditarProductoComponent} from './productos/editar/editar.component'
import { VerComponent } from './productos/ver/ver.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ArrendarComponent } from './arrendar/arrendar.component';
import { CrearServicioComponent } from './servicios/crear-servicio/crear-servicio.component';
import { SubproductosComponent } from './productos/subproductos/subproductos.component';
import { CrearSubproductoComponent } from './productos/subproductos/crear-subproducto/crear-subproducto.component';
import { EditarSubproductoComponent } from './productos/subproductos/editar-subproducto/editar-subproducto.component';
import { StockComponent } from './productos/subproductos/stock/stock.component';
import { CrearStockComponent } from './productos/subproductos/stock/crear-stock/crear-stock.component';
import { EditarStockComponent } from './productos/subproductos/stock/editar-stock/editar-stock.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(EmprendedorRoutes),
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
    
  PostulacionComponent,
  CrearProductoComponent,
  EditarProductoComponent,
  VerComponent,
  RegistroComponent,
    
  CompletaRegistroComponent,
    
  DashboardComponent,
    
  ProductosComponent,
    
  ServiciosComponent,
    
  ArrendarComponent,
    
  CrearServicioComponent,
    
  SubproductosComponent,
    
  CrearSubproductoComponent,
    
  EditarSubproductoComponent,
    
  StockComponent,
    
  CrearStockComponent,
    
  EditarStockComponent]
})
export class EmprendedorComponentsModule {}
