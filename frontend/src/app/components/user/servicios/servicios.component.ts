import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-servicios',
  templateUrl: './servicios.component.html',
  styleUrls: ['./servicios.component.css']
})
export class ServiciosComponent implements OnInit {
  constructor(
    public router: Router,
  ) { }
  ngOnInit(): void {
  }
  goCategoria(id: string): void{
    console.log(id);
    localStorage.setItem('categoria', id);
    setTimeout(() => {
      this.router.navigate(['/detalle-categoria']);
    }, 200);
  }

}
