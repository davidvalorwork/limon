import { Component, OnInit, ViewChild } from '@angular/core';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar } from '../../../services/snackbar.service';
import { Router } from '@angular/router';
import { CategoriaService } from '../../../services/categorias.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
// import {CrearComponent} from './crear/crear.component'
import { DesicionComponent } from '../../utils/desicion/desicion.component';
// import {EditarComponent} from './editar/editar.component'
import { MatPaginator } from '@angular/material/paginator';
import { PagoService } from '../../../services/pagos.service';
import { MatTableDataSource } from '@angular/material/table';
import { FlowService } from '../../../services/flow.service';
import { ProductosService } from '../../../services/productos.service';
import { SubproductoService } from '../../../services/subproductos.service';
import { SucursalService } from '../../../services/sucursal.service';
import { StockService } from '../../../services/stock.service';
import { serviciosService } from '../../../services/servicios.service';
import { environment } from '../../../../environments/environment';
import { ShipitService } from '../../../services/shipit.service';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css'],
})
export class FacturaComponent implements OnInit {
  // @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<[]>;
  region;
  comuna;
  direccionEspecifica = '';
  pedidos2;
  precioEnvio;
  precioMasEnvio;
  regiones = [];
  comunas = [];
  comunasReg = [];
  displayedColumns: string[] = [
    'producto',
    'subproducto',
    'sucursal',
    'monto',
    'estado',
    'options',
  ];
  pedidos: any = [];
  editar = false;
  sucursales;
  montoTotal: number;
  urlApi = `${environment.URL_API}/`;
  constructor(
    private categoriaService: CategoriaService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    private router: Router,
    private pagoService: PagoService,
    public dialog: MatDialog,
    public flowService: FlowService,
    private sucursalService: SucursalService,
    private subproductoService: SubproductoService,
    private productoService: ProductosService,
    private stockService: StockService,
    private servicioService: serviciosService,
    private shipitService: ShipitService,
    private carritoService: CarritoService
  ) {}
  buscar(event: any): void {
    const categories = this.pedidos;
    this.dataSource = categories.filter((category: any) => {
      const categoryS = JSON.stringify(category);
      return categoryS.indexOf(event.target.value) === -1 ? false : true;
    });
  }

  cambiarCantidad(e, index): void {
    const cantidad = parseInt(e.target.value);
    this.pedidos2[index].cantidad = cantidad;
    this.midePrecio();
  }
  getSucursales(): void {
    this.shipitService.getComunas().subscribe((res) => {
      console.log(res);
      this.comunas = res;
    });
    this.shipitService.getRegiones().subscribe((res) => {
      console.log(res);
      this.regiones = res;
    });
  }

  ngOnInit(): void {
    this.getSucursales();
    this.getSucursalesShipit();
  }

  obtenerCarrito(): void {
    this.carritoService
      .getCarrito(localStorage.getItem('id_usuarios'))
      .subscribe((res) => {
        console.log(res.payload[0]);
        this.pedidos = res.payload[0].pedidosInfo;
        this.pedidos2 = res.payload[0].pedidos;
        this.midePrecio();
        this.loadingBar.complete();
      });
  }

  obtenerPagos(): void {
    this.loadingBar.start();
    this.obtenerCarrito();
  }

  getSucursalesShipit(): void {
    this.shipitService.getSucursales().subscribe((res) => {
      this.sucursales = res;
      this.obtenerPagos();
    });
  }

  getPagos(e): void {
    console.log(e);
    console.log(this.pedidos);
    this.precioEnvio = '0';
    this.precioMasEnvio = '0';
    for (const i of Object.keys(this.pedidos)) {
      console.log(this.pedidos[i]);
      if(this.pedidos[i].producto){
        const pedido = {
          length: parseInt(this.pedidos[i].producto.length),
          height: parseInt(this.pedidos[i].producto.height),
          width: parseInt(this.pedidos[i].producto.width),
          weight: parseInt(this.pedidos[i].producto.weight),
          destiny: 'Domicilio',
          to_commune_id: e,
        };
        console.log(pedido);
        this.shipitService.consultarPrecio({ package: pedido }).subscribe(
          (res: any) => {
            console.log(res);
            this.precioEnvio =
              parseFloat(this.precioEnvio) +
              res.lower_price.price * this.pedidos2[i].cantidad;
            this.setPrecioMasEnvio();
          },
          (err) => {
            console.log(err);
          }
        );
      }else{
        const imenos = (parseInt(i) + 1);
        console.log(imenos);
        console.log(this.pedidos.length);
        if (imenos === this.pedidos.length){
          this.setPrecioMasEnvio();
        }
      }
    }
  }

  setPrecioMasEnvio(): void {
    this.precioMasEnvio = parseFloat(this.precioEnvio) + this.montoTotal;
  }

  midePrecio(): void {
    this.montoTotal = 0;
    for (const i of Object.keys(this.pedidos)) {
      if(this.pedidos[i].producto){
        const suma = this.pedidos[i].producto.precio * this.pedidos2[i].cantidad;
        this.montoTotal = this.montoTotal + suma;
      }else{
        const suma = this.pedidos[i].service.precio * this.pedidos2[i].cantidad;
        this.montoTotal = this.montoTotal + suma;
      }
    }
    console.log(this.comuna);
    this.getPagos(this.comuna);
  }
  eliminar(id: string): void {
    this.loadingBar.start();
    const query = { pedido: id, type: 'Eliminar' };
    this.carritoService.actualizar(query).subscribe(
      (response: any) => {
        console.log(response.payload);
        this.loadingBar.complete();
        this.snackBar.success('Pedido eliminado.', '');
        this.ngOnInit();
      },
      (err) => {
        console.log(err);
        this.loadingBar.complete();
        this.snackBar.err('Error', 'x');
      }
    );
  }
  pagar(): void {
    this.flowService
      .generarLink({ monto: this.precioMasEnvio, id_pagos: 1 })
      .subscribe(
        (response: any) => {
          console.log(response);
          window.open(response.payload, '_self');
        },
        (err) => {
          this.snackBar.err('Error al contactar con flow', 'x');
        }
      );
  }

  carritoEditar(): void {
    this.editar = true;
  }

  regionChange(e): void {
    console.log(e);
    this.comunasReg = [];
    for (const i of Object.keys(this.comunas)) {
      console.log(this.comunas[i]);
      this.comunas[i].region_id === e
        ? this.comunasReg.push(this.comunas[i])
        : null;
    }
  }
}
