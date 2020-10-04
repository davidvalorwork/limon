import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../../services/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog'
import {SubproductoService} from '../../../../../services/subproductos.service'
import {environment} from '../../../../../../environments/environment'
import {UploadService} from '../../../../../services/upload.service'

@Component({
  selector: 'app-crear-subproducto',
  templateUrl: './crear-subproducto.component.html',
  styleUrls: ['./crear-subproducto.component.css']
})
export class CrearSubproductoComponent implements OnInit {

  submit:number=0;
  url_api:string = `${environment.URL_API}/`

  form:FormGroup = this.fb.group({
    nombre_subproducto:['', Validators.required],
    borrado:[0],
    productoIdProductos:[localStorage.getItem('producto')]
  })

  constructor(
    private fb: FormBuilder,
    public uploadService:UploadService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    private subproductoService:SubproductoService,
    public dialogRef: MatDialogRef<CrearSubproductoComponent>,
    // private router:Router,
  ) { }

  ngOnInit(): void {}

  crear(producto:any){
    console.log(producto)
    this.submit = 1
    this.loadingBar.start()
    this.subproductoService.create(producto).subscribe((response)=>{
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
