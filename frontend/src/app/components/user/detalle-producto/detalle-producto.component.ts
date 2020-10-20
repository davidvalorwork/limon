import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../../services/productos.service';
import { CategoriaService } from '../../../services/categorias.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { StockService } from '../../../services/stock.service';
import { SubproductoService } from '../../../services/subproductos.service';
import { SnackBar } from '../../../services/snackbar.service';
import { environment } from '../../../../environments/environment';
import { PagoService } from '../../../services/pagos.service';
import { StockComponent } from '../../emprendedor/productos/subproductos/stock/stock.component';
import { SucursalService } from 'src/app/services/sucursal.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { ShipitService } from '../../../services/shipit.service';
import { CarritoService } from '../../../services/carrito.service';

@Component({
  selector: 'app-detalle-producto',
  templateUrl: './detalle-producto.component.html',
  styleUrls: ['./detalle-producto.component.css'],
})
export class DetalleProductoComponent implements OnInit {
  product;
  subproductos = [];
  stock;
  cantidad = 0;
  subproductosBD = [];
  precio = 0;
  sucursales = [];
  mostrarSubproductos = false;
  imageObject: Array<object> = [];
  categoria;
  form: FormGroup = this.fb.group({
    sucursal: ['', Validators.required],
    subproducto: ['', Validators.required],
  });

  sucursalesShipit;

  constructor(
    public route: ActivatedRoute,
    public productoService: ProductosService,
    public categoriaService: CategoriaService,
    public snackBar: SnackBar,
    public router: Router,
    public fb: FormBuilder,
    public pagoService: PagoService,
    private stockService: StockService,
    private sucursalService: SucursalService,
    private subproductoService: SubproductoService,
    private shipitService: ShipitService,
    private carritoService: CarritoService
  ) {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.categoriaService
      .getId(localStorage.getItem('categoria'))
      .subscribe((response) => {
        this.categoria = response.payload;
      });
    this.productoService
      .getByCondition({
        condicion: {
          where: { id_productos: this.route.snapshot.paramMap.get('id') },
        },
      })
      .subscribe((response) => {
        this.product = response.payload[0];
        console.log(this.product);
        const urls = response.payload[0].imagenes.split(',');
        for (const i of Object.keys(urls)) {
          const image = {
            image: `${environment.URL_API}/${urls[i]}`,
            thumbImage: `${environment.URL_API}/${urls[i]}`,
            alt: '',
          };
          this.imageObject.push(image);
        }
      });
    this.getSucursalesShipit();

    this.subproductoService
      .getByCondition({
        condicion: {
          where: {
            productoIdProductos: this.route.snapshot.paramMap.get('id'),
          },
        },
      })
      .subscribe((response: any) => {
        this.subproductosBD = response.payload;
      });
  }

  getSucursalesShipit(): void {
    this.shipitService.getSucursales().subscribe((res) => {
      this.sucursalesShipit = res;
      console.log(res);
      this.getSucursalesOfProduct();
    });
  }

  getSucursalesOfProduct(): void {
    for (const i of Object.keys(this.sucursalesShipit)) {
      this.stockService
        .getByCondition({
          condicion: {
            where: {
              id_sucursal: this.sucursalesShipit[i].id,
              borrado: 0,
            },
          },
        })
        .subscribe((sucursal: any) => {
          let stock = false;
          for (const i in sucursal.payload) {
            // tslint:disable-next-line: radix
            if (parseInt(sucursal.payload[i].cantidad) > 0) {
              stock = true;
            }
          }
          if (stock) { this.sucursales.push(this.sucursalesShipit[i]); }
        });
    }
  }

  ngOnInit(): void {}

  anadirCarrito(): void {
    this.stockService
      .getByCondition({
        condicion: {
          where: {
            id_sucursal: this.form.value.sucursal,
            subproductoIdSubproductos: this.form.value.subproducto,
            borrado: 0,
          },
        },
      })
      .subscribe((responseStock: any) => {
        const usuario = JSON.parse(localStorage.getItem('usuario'));
        if (usuario) {
          console.log(usuario);
          this.revisaCarrito(usuario, responseStock);
        } else {
          console.log('Sin usuario');
          this.snackBar.err('Por favor registrese.', 'x');
          this.router.navigate(['../../login']);
        }
      });
  }

  revisaCarrito(usuario, stock): void {
    this.carritoService.getCarrito(usuario.id_usuarios).subscribe((res) => {
      if (res.payload.length < 1) {
        this.crearCarrito(usuario, stock);
      } else {
        this.actualizarCarrito(usuario, stock);
      }
    });
  }

  actualizarCarrito(usuario, stock): void {
    const query = {
      usuario: usuario.id_usuarios,
      pedido: {
        cantidad: this.cantidad,
        borrado: 0,
        stockIdStock: stock.payload[0].id_stock,
      },
      type: 'Agregar',
    };
    this.carritoService.actualizar(query).subscribe((res) => {
      console.log(res.payload);
      this.router.navigate(['../../carrito']);
    });
  }

  crearCarrito(usuario, stock): void {
    const query = {
      carrito: {
        estado_carrito: 'Por pagar',
        borrado: 0,
        usuarioIdUsuarios: usuario.id_usuarios,
      },
      pedido: {
        cantidad: this.cantidad,
        borrado: 0,
        stockIdStock: stock.payload[0].id_stock,
      },
    };
    console.log(query);
    this.carritoService.create(query).subscribe((res) => {
      console.log(res.payload);
      this.router.navigate(['../../carrito']);
    });
  }

  nuevasucursal(): void {
    console.log(this.form.value.sucursal);
    console.log(this.subproductosBD);
    this.subproductos = [];
    this.form.controls.subproducto.setValue('');
    this.mostrarSubproductos = true;
    for (let i in this.subproductosBD) {
      this.stockService
        .getByCondition({
          condicion: {
            where: {
              id_sucursal: this.form.value.sucursal,
              subproductoIdSubproductos: this.subproductosBD[i].id_subproductos,
              borrado: 0,
            },
          },
        })
        .subscribe((response: any) => {
          console.log(response.payload);
          for (let x in response.payload) {
            if (response.payload[x].id_sucursal === this.form.value.sucursal) {
              this.subproductos.push(this.subproductosBD[i]);
            }
          }
        });
    }
  }
  ChangeCantidad(event: any) {
    let cantidad = event.target.value;
    console.log(cantidad);
    this.cantidad = parseInt(cantidad);
    event.preventDefault();
    if (cantidad !== '') {
      // this.lookInPrecios(parseInt(cantidad));
      this.precio = parseInt(cantidad) * this.product.precio;
    } else {
      // this.precio = "0"
    }
  }

  nuevoproducto() {
    this.precio = 0;
    this.cantidad = 0;
    this.stockService
      .getByCondition({
        condicion: {
          where: {
            subproductoIdSubproductos: this.form.value.subproducto,
            id_sucursal: this.form.value.sucursal,
            borrado: 0,
          },
        },
      })
      .subscribe((response: any) => {
        console.log(response.payload[0]);
        this.stock = response.payload[0];
      });
  }

  aumenta() {
    if (parseInt(this.stock.cantidad) > this.cantidad) {
      this.cantidad += 1;
      this.precio = this.cantidad * this.product.precio;
    } else {
      this.snackBar.err('No hay suficiente stock para su demanda', 'x');
    }
  }
  resta() {
    if (this.cantidad > 0) {
      this.cantidad -= 1;
      this.precio = this.cantidad * this.product.precio;
    }
  }
}
