// import { serviciosService } from './../../../services/servicios.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { CategoriaService } from '../../../services/categorias.service';
import { serviciosService } from '../../../services/servicios.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar } from '../../../services/snackbar.service';
import { environment } from '../../../../environments/environment';
import { PagoService } from '../../../services/pagos.service';
import { CarritoService } from '../../../services/carrito.service';
// import { ServiciosComponent } from './../../emprendedor/servicios/servicios.component';

@Component({
  selector: 'app-detalle-servicio',
  templateUrl: './detalle-servicio.component.html',
  styleUrls: ['./detalle-servicio.component.css'],
})
export class DetalleServicioComponent implements OnInit {
  servicio: any;
  subproductos = [];
  stock: any;
  cantidad = 0;
  subproductosBD = [];
  precio = 0;
  sucursales = [];
  mostrarSubproductos = false;
  imageObject: Array<object> = [];
  categoria: any;
  form: FormGroup = this.fb.group({
    sucursal: ['', Validators.required],
    subproducto: ['', Validators.required],
  });

  constructor(
    public route: ActivatedRoute,
    public categoriaService: CategoriaService,
    public snackBar: SnackBar,
    public router: Router,
    public fb: FormBuilder,
    public pagoService: PagoService,
    public servicioServicio: serviciosService,
    public carritoService: CarritoService,
    public servicioService: serviciosService,
  ) {
    console.log(this.route.snapshot.paramMap.get('id'));
    this.categoriaService
      .getId(localStorage.getItem('categoria'))
      .subscribe((response) => {
        this.categoria = response.payload;
      });
    this.servicioServicio
      .getByCondition({
        condicion: {
          where: { id_servicios: this.route.snapshot.paramMap.get('id') },
        },
      })
      .subscribe((response) => {
        this.servicio = response.payload[0];
        console.log(this.servicio);
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
  }

  ngOnInit(): void {}

  anadirCarrito(): void {
    const usuario = JSON.parse(localStorage.getItem('usuario'));
    if (usuario) {
      this.revisaCarrito(usuario, this.servicio);
    } else {
      console.log('Sin usuario');
      this.snackBar.err('Por favor registrese.', 'x');
      this.router.navigate(['../../login']);
    }
  }

  revisaCarrito(usuario, servicio): void {
    this.carritoService.getCarrito(usuario.id_usuarios).subscribe((res: any) => {
      if (res.payload.length < 1) {
        this.crearCarrito(usuario, servicio);
      } else {
        this.actualizarCarrito(usuario, servicio);
      }
    });
  }

  actualizarCarrito(usuario, servicio): void {
    const query = {
      usuario: usuario.id_usuarios,
      pedido: {
        cantidad: 1,
        borrado: 0,
        servicioIdServicios: servicio.id_servicios,
      },
      type: 'Agregar',
    };
    this.carritoService.actualizar(query).subscribe((res) => {
      console.log(res.payload);
      this.router.navigate(['../../carrito']);
    });
  }

  crearCarrito(usuario, servicio): void {
    const query = {
      carrito: {
        estado_carrito: 'Por pagar',
        borrado: 0,
        usuarioIdUsuarios: usuario.id_usuarios,
      },
      pedido: {
        cantidad: 1,
        borrado: 0,
        servicioIdServicios: servicio.id_servicios,
      },
    };
    console.log(query);
    this.carritoService.create(query).subscribe((res) => {
      console.log(res.payload);
      this.router.navigate(['../../carrito']);
    });
  }

  // anadirCarrito(): void {
  //   const usuario = JSON.parse(localStorage.getItem('usuario'));
  //   if (usuario) {
  //     console.log(usuario);
  //     this.pagoService
  //       .create({
  //         monto: this.servicio.precio,
  //         estatus_pago: 'Borrador',
  //         borrado: 0,
  //         servicioIdServicios: this.servicio.id_servicios,
  //         usuarioIdUsuarios: usuario.id_usuarios,
  //       })
  //       .subscribe((response: any) => {
  //         console.log(response.payload);
  //         this.router.navigate(['../../carrito']);
  //       });
  //   } else {
  //     console.log('Sin usuario');
  //     this.snackBar.err('Por favor registrese.', 'x');
  //     this.router.navigate(['../../login']);
  //   }
  // }
}
