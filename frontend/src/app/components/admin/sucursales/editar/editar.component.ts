import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../../services/categorias.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {SucursalService} from '../../../../services/sucursal.service'

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarSucursalComponent implements OnInit {
  form:FormGroup = this.fb.group({
    id_sucursales:[this.data.id_sucursales],
    nombre_sucursal:[this.data.nombre_sucursal, Validators.required],
    direccion:[this.data.direccion, Validators.required],
    borrado:[this.data.borrado],
    createdAt:[this.data.createdAt],
    updatedAt:[this.data.updatedAt],
  })

  constructor(
    private fb: FormBuilder,
    private categoriaService:CategoriaService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    public dialogRef: MatDialogRef<EditarSucursalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sucursalService:SucursalService,
    // private r  outer:Router,
  ) {
    console.log(data)
  }

  ngOnInit(): void {
  }

  editar(categoria:any){
    console.log(categoria)
    categoria.nombre_id = `id_sucursales`
    this.loadingBar.start()
    this.sucursalService.edit(categoria.id_sucursales,categoria).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Sucursal creada con éxito.","")
      this.dialogRef.close()
    },
    err=>{
      console.log(err)
      this.snackBar.err("A ocurrido un error.","X")
    })
  }
}
