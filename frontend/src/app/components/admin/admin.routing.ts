import { Routes } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component'
import { UsuariosComponent} from './usuarios/usuarios.component'
import { CategoriasComponent } from './categorias/categorias.component'
import { ProductosComponent } from './productos/productos.component'
import { PerfilComponent } from './perfil/perfil.component'
import { ServiciosComponent } from './servicios/servicios.component'
import { SucursalesComponent } from './sucursales/sucursales.component'

export const AdminRoutes: Routes = [
  {
    path: 'dashboard',
    component: UsuariosComponent,
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
  },
  {
    path: 'categorias',
    component: CategoriasComponent,
  },
  {
    path: 'productos',
    component:  ProductosComponent,
  },
  {
    path:'perfil',
    component:PerfilComponent
  },
  {
    path:'servicios',
    component:ServiciosComponent
  },
  {
    path:'sucursales',
    component:SucursalesComponent
  },
  
];
