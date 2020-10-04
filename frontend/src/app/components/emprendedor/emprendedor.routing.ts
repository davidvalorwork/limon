import { Routes } from '@angular/router';
import { PostulacionComponent } from './postulacion/postulacion.component';
import { CompletaRegistroComponent } from './completa-registro/completa-registro.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductosComponent } from './productos/productos.component';
import { ServiciosComponent } from './servicios/servicios.component';
import { ArrendarComponent } from './arrendar/arrendar.component';
import { SubproductosComponent } from './productos/subproductos/subproductos.component';
import { StockComponent } from './productos/subproductos/stock/stock.component';
export const EmprendedorRoutes: Routes = [
  {path:'dashboard',component:DashboardComponent},
  {path:'productos',component:ProductosComponent},
  {path:'servicios',component:ServiciosComponent},
  {path:'arrendar',component:ArrendarComponent},
  {path:'subproductos',component:SubproductosComponent},
  {path:'stock',component:StockComponent},
];
