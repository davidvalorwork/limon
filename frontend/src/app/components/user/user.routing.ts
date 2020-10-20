import { Routes } from '@angular/router';
import {PerfilComponent} from '../admin/perfil/perfil.component'
import { ProductosComponent } from './productos/productos.component';
import { DetalleProductoComponent } from './detalle-producto/detalle-producto.component';

import { ServiciosComponent } from './servicios/servicios.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { ContactoComponent } from './contacto/contacto.component';
import { ArriendoComponent } from './arriendo/arriendo.component';
import { DetalleCategoriaComponent } from './detalle-categoria/detalle-categoria.component';
import { CarritoComponent } from './carrito/carrito.component';
import { DetalleServicioComponent } from './detalle-servicio/detalle-servicio.component';
import { FacturaComponent } from './factura/factura.component';

export const UserRoutes: Routes = [
  {
    path:'',
    component:ProductosComponent
  },
  {
    path:'perfil',
    component:PerfilComponent
  },
  {
    path:'nosotros',
    component:NosotrosComponent
  },

  {
    path:'servicios',
    component:ServiciosComponent
  },
  {
    path:'contacto',
    component:ContactoComponent
  },
  {
    path:'arriendo',
    component:ArriendoComponent
  },
  {
    path:'detalle-categoria',
    component:DetalleCategoriaComponent
  },
  {
    path:'detalle-producto/:id',
    component:DetalleProductoComponent
  },
  {
    path:'detalle-servicio/:id',
    component:DetalleServicioComponent
  },
  {
    path:'carrito',
    component:FacturaComponent
  },
  {
    path:'factura',
    component:CarritoComponent
  },
];
