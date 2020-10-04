import { Component, OnInit, Inject } from '@angular/core';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {environment} from '../../../../../../environments/environment'

@Component({
  selector: 'app-ver-productos',
  templateUrl: './ver-productos.component.html',
  styleUrls: ['./ver-productos.component.css']
})
export class VerProductosComponent implements OnInit {
  url_api:string=`${environment.URL_API}/`
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  productos= this.data.split(',')

  ngOnInit(): void {
  }

}
