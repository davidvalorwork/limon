import { Component, OnInit } from '@angular/core';
import { CategoriaService } from '../../../services/categorias.service';
import { ProductosService } from '../../../services/productos.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  categorias: any;
  productos: any;
  urlApi: string = environment.URL_API + '/';
  search_array(array: any[], valuetofind) {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < array.length; i++) {
      if (array[i].id_categorias === valuetofind) {
        return array[i];
      }
    }
    return -1;
  }
  constructor(
    public categoriaService: CategoriaService,
    public productoService: ProductosService,
    private router: Router
  ) {
    this.categoriaService.getCategorias().subscribe((response: any) => {
      this.categorias = response.payload;
      console.log(this.categorias);
      this.productoService.get().subscribe((response: any) => {
        this.productos = response.payload;
        console.log(this.productos);
        for (const i of Object.keys(this.productos)) {
          const categoria = this.search_array(
            this.categorias,
            this.productos[i].categoriaIdCategorias
          );
          this.productos[i].categoria = categoria.nombre_categoria;
        }
      });
    });
  }

  ngOnInit(): void {}

  goCategoria(id: string): void {
    console.log(id);
    localStorage.setItem('categoria', id);
    setTimeout(() => {
      this.router.navigate(['/detalle-categoria']);
    }, 200);
  }
}
