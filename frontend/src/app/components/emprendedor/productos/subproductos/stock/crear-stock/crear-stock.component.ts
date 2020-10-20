import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../../../services/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog'
import {environment} from '../../../../../../../environments/environment'
import {SucursalService} from '../../../../../../services/sucursal.service'
import {StockService} from '../../../../../../services/stock.service'
import { ShipitService } from '../../../../../../services/shipit.service'

@Component({
  selector: 'app-crear-stock',
  templateUrl: './crear-stock.component.html',
  styleUrls: ['./crear-stock.component.css']
})
export class CrearStockComponent implements OnInit {

  submit:number=0;
  url_api:string = `${environment.URL_API}/`
  sucursales:any[]=[]

  form:FormGroup = this.fb.group({
    cantidad:['', Validators.required],
    id_sucursal:['', Validators.required],
    borrado:[0],
    subproductoIdSubproductos:[localStorage.getItem('subproducto')],
  })

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    public dialogRef: MatDialogRef<CrearStockComponent>,
    private sucursalService: SucursalService,
    private stockService:StockService,
    private shipitService:ShipitService,
    // private router:Router,
  ) { }

  getSucursalesShipit(){
    this.shipitService.getSucursales().subscribe((res)=>{
      console.log(res)
      this.sucursales = res
    })
  }

  getSucursalesBD(){
    this.sucursalService.get().subscribe((response:any)=>{
      console.log(response.payload)
      this.sucursales = response.payload
    })
  }

  ngOnInit(): void {
    this.getSucursalesShipit()
  }

  crear(producto:any){
    console.log(producto)
    this.submit = 1
    this.loadingBar.start()
    this.stockService.create(producto).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Subproducto creado con éxito.","")
      this.dialogRef.close()
    },
    err=>{
      console.log(err)
      this.submit = 0
      this.snackBar.err("A ocurrido un error.","X")
    })
  }
}

