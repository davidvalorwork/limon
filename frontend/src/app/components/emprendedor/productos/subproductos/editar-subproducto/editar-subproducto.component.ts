import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../../services/snackbar.service';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog'
import {SubproductoService} from '../../../../../services/subproductos.service'
import {environment} from '../../../../../../environments/environment'
import {UploadService} from '../../../../../services/upload.service'

@Component({
  selector: 'app-editar-subproducto',
  templateUrl: './editar-subproducto.component.html',
  styleUrls: ['./editar-subproducto.component.css']
})
export class EditarSubproductoComponent implements OnInit {

  submit:number=0;
  url_api:string = `${environment.URL_API}/`

  form:FormGroup = this.fb.group({
    id_subproductos:[this.data.id_subproductos],
    nombre_subproducto:[this.data.nombre_subproducto, Validators.required],
    borrado:[0],
    productoIdProductos:[this.data.productoIdProductos]
  })

  constructor(
    private fb: FormBuilder,
    public uploadService:UploadService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    private subproductoService:SubproductoService,
    public dialogRef: MatDialogRef<EditarSubproductoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    // private router:Router,
  ) { }

  ngOnInit(): void {}

  crear(producto:any){
    console.log(producto)
    this.submit = 1
    producto.nombre_id =`id_subproductos`
    this.loadingBar.start()
    this.subproductoService.edit(producto.id_subproductos,producto).subscribe((response)=>{
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
