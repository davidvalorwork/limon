import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CategoriaService } from '../../../../services/categorias.service';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog'
import {SucursalService} from '../../../../services/sucursal.service'

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearSucursalComponent implements OnInit {
  form:FormGroup = this.fb.group({
    nombre_sucursal:['', Validators.required],
    direccion:['',Validators.required],
    borrado:[0]
  })

  constructor(
    private fb: FormBuilder,
    private categoriaService:CategoriaService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    public dialogRef: MatDialogRef<CrearSucursalComponent>,
    private sucursalService:SucursalService,
    // private router:Router,
  ) { }

  ngOnInit(): void {
  }

  crear(categoria:any){
    this.loadingBar.start()
    this.sucursalService.create(categoria).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Categoria creada con éxito.","")
      this.dialogRef.close()
    },
    err=>{
      console.log(err)
      this.snackBar.err("A ocurrido un error.","X")
    })
  }

}

