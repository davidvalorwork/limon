import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../../../services/snackbar.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {environment} from '../../../../../../../environments/environment'
import {SucursalService} from '../../../../../../services/sucursal.service'
import {StockService} from '../../../../../../services/stock.service'
import {ShipitService} from '../../../../../../services/shipit.service'
@Component({
  selector: 'app-editar-stock',
  templateUrl: './editar-stock.component.html',
  styleUrls: ['./editar-stock.component.css']
})
export class EditarStockComponent implements OnInit {

  submit:number=0;
  url_api:string = `${environment.URL_API}/`
  sucursales:any[]=[]

  form:FormGroup = this.fb.group({
    id_stock:[this.data.id_stock],
    cantidad:[this.data.cantidad, Validators.required],
    id_sucursal:[this.data.id_sucursal, Validators.required],
    borrado:[0],
    subproductoIdSubproductos:[this.data.subproductoIdSubproductos],
  })

  constructor(
    private fb: FormBuilder,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    public dialogRef: MatDialogRef<EditarStockComponent>,
    private sucursalService: SucursalService,
    private stockService:StockService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private shipitService:ShipitService,
    // private router:Router,
  ) { }

  getSucursalesShipit(){
    this.shipitService.getSucursales().subscribe((res)=>{
      console.log(res)
      this.sucursales = res
    })
  }

  ngOnInit(): void {
    // this.sucursalService.get().subscribe((response:any)=>{
    //   console.log(response.payload)
    //   this.sucursales = response.payload
    // })
    this.getSucursalesShipit()
  }

  crear(producto:any){
    console.log(producto)
    this.submit = 1
    this.loadingBar.start()
    producto.nombre_id=`id_stock`
    this.stockService.edit(producto.id_stock,producto).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Stock editado con éxito.","")
      this.dialogRef.close()
    },
    err=>{
      console.log(err)
      this.submit = 0
      this.snackBar.err("A ocurrido un error.","X")
    })
  }
}

