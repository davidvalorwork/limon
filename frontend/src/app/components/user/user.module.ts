import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { MaterialModule } from '../../material.module';
import { CdkTableModule } from '@angular/cdk/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { UserRoutes } from './user.routing';
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';
import { NgImageSliderModule } from 'ng-image-slider';

import { ServiciosComponent } from './servicios/servicios.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { DetalleCategoriaComponent } from './detalle-categoria/detalle-categoria.component';
import { CarritoComponent } from './carrito/carrito.component';
import { ArriendoComponent } from './arriendo/arriendo.component';
import { DetalleServicioComponent } from './detalle-servicio/detalle-servicio.component';

// import { CategoriasPipe } from '../../pipe/categorias.pipe';

@NgModule({ 
  imports: [
    CommonModule,
    RouterModule.forChild(UserRoutes),
    MaterialModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    NgImageSliderModule,
    CdkTableModule,
    
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  entryComponents: [],
  declarations: [
  ProductosComponent,
  // CategoriasPipe,
  DetalleProductoComponent,
  ServiciosComponent,
  NosotrosComponent,
  ContactoComponent,
  DetalleCategoriaComponent,
  CarritoComponent,
  ArriendoComponent,
  DetalleServicioComponent]
})
export class UserComponentsModule {}
