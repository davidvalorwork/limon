import { Routes } from '@angular/router';
import { DashboardComponent} from './dashboard/dashboard.component'
import { UsuariosComponent} from './usuarios/usuarios.component'
import { CategoriasComponent } from './categorias/categorias.component'
import { ProductosComponent } from './productos/productos.component'
import { PerfilComponent } from './perfil/perfil.component'
import { ServiciosComponent } from './servicios/servicios.component'

export const AdminRoutes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
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
  
];
