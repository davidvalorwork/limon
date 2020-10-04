import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {MatDialogRef} from '@angular/material/dialog'
import {ProductosService} from '../../../../services/productos.service'
import {CategoriaService} from '../../../../services/categorias.service'
import {environment} from '../../../../../environments/environment'
import {UploadService} from '../../../../services/upload.service'

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearProductoComponent implements OnInit {
  @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;

  submit:number=0;
  url_api:string = `${environment.URL_API}/`
  categoriasBD = [];
  imagenes = [];

  sucursales = ['Casa Vendedor', 'Sucursal 1', 'Sucursal 2',]

  form:FormGroup = this.fb.group({
    nombre_producto:['', Validators.required],
    imagenes:[],
    precio:['', Validators.required],
    descripcion_producto:['', Validators.required],
    estado:['En Revisión'],
    borrado:[0],
    categoriaIdCategorias:['',Validators.required],
    usuarioIdUsuarios:[localStorage.getItem('id_usuarios')]
  })

  constructor(
    private fb: FormBuilder,
    public uploadService:UploadService,
    private productoService:ProductosService,
    private loadingBar: LoadingBarService,
    private snackBar: SnackBar,
    private categoriasService:CategoriaService,
    public dialogRef: MatDialogRef<CrearProductoComponent>,
    // private router:Router,
  ) { }

  ngOnInit(): void {
    this.categoriasService.getCategorias().subscribe((response:any)=>{
      console.log(response.payload)
      this.categoriasBD = response.payload
    })
  }

  crear(producto:any){
    producto.imagenes = this.imagenes.join(',')
    console.log(producto)
    this.submit = 1
    this.loadingBar.start()
    this.productoService.create(producto).subscribe((response)=>{
      console.log(response)      
      this.loadingBar.complete()
      this.snackBar.success("Producto creado con éxito.","")
      this.dialogRef.close()
    },
    err=>{
      console.log(err)
      this.submit = 0
      this.snackBar.err("A ocurrido un error.","X")
    })
  }

  onClick() {  
    const fileUpload = this.fileUpload.nativeElement;
    fileUpload.onchange = () => {  
        const file = fileUpload.files[0];  
        this.uploadFile(file,'imagenes'); 
        //this.uploadFiles();  
    };  
    fileUpload.click();  
  }

  uploadFile(file:any,array:string) { 
    console.log(array)
    const fileData = file;
    let bodyFormData = new FormData();  
    bodyFormData.append("file", fileData,fileData.name);  
    file.inProgress = true;  
    this.loadingBar.start()
    this.uploadService.upload(bodyFormData).subscribe((response:any)=>{
        this.loadingBar.complete()
        this.snackBar.success("Archivo subido.","")
        // console.log(response.payload)
        this[array].push(response.payload)
    })
  }

}
