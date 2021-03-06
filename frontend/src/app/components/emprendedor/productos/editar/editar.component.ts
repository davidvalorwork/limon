import { Component, OnInit,Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {ProductosService} from '../../../../services/productos.service'
import {CategoriaService} from '../../../../services/categorias.service'
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {UploadService} from '../../../../services/upload.service'
import {environment} from '../../../../../environments/environment'


@Component({
    selector:'editar-producto',
    templateUrl:'./editar.component.html',
    styleUrls:['./editar.component.css']
})
export class EditarProductoComponent implements OnInit{
    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    @ViewChild("fileUpload2", {static: false}) fileUpload2: ElementRef;
    filesProduct  = []; 
    filesPlantilla  = []; 
    url_api:string = `${environment.URL_API}/`

    categoriasBD = [];

 // categoriaActual;
    sucursales = ['Casa Vendedor', 'Sucursal 1', 'Sucursal 2',]


    imgRoute = `${environment.URL_API}/uploads/38a1be0c1416e6bd23e706e3535f3e95`

    form:FormGroup = this.fb.group({
        id_productos:[this.data.id_productos],
        nombre_producto:[this.data.nombre_producto, Validators.required],
        descripcion_producto:[this.data.descripcion_producto, Validators.required],
        precio:[this.data.precio, Validators.required],
        sku:[this.data.sku, Validators.required],
        borrado:[this.data.borrado],
        length:[this.data.length, Validators.required],
        height:[this.data.height, Validators.required],
        width:[this.data.width, Validators.required],
        weight:[this.data.weight, Validators.required],
        nombre_id:['id_productos'],
        categoriaIdCategorias:[this.data.categoriaIdCategorias, Validators.required], //localStorage.getItem("categoria")
        imagenes:[],
    })

        constructor(
        public uploadService:UploadService,
        private fb: FormBuilder,
        private productoService:ProductosService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<EditarProductoComponent>,
        private categoriasService:CategoriaService,

        // private router:Router,
        ) { }

        ngOnInit(): void {
            this.categoriasService.getCategorias().subscribe((response:any)=>{
                console.log(response.payload)
                this.categoriasBD = response.payload
              })
             
             // this.categoriaActual = this.categoriasBD.indexOf(this.data.categoriaIdCategorias);
            console.log(this.data)
            this.filesProduct = this.data.imagenes.split(',')

            this.filesProduct = this.filesProduct.filter((img:string)=>{
                return img!==''?true:false;
            })

        }

    crear(producto:any){
        if(this.form.status !== "VALID") return true
        console.log(this.filesProduct.join(','))
        producto.imagenes = this.filesProduct.join(",")
        this.loadingBar.start()
        this.productoService.edit(producto.id_productos,producto).subscribe((response)=>{
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
    
      onClick() {  
        const fileUpload = this.fileUpload.nativeElement;
        fileUpload.onchange = () => {  
            const file = fileUpload.files[0];  
            this.uploadFile(file,'filesProduct'); 
        //   this.uploadFiles();  
        };  
        fileUpload.click();  
      }
      onClick2() {  
        const fileUpload2 = this.fileUpload2.nativeElement;
        fileUpload2.onchange = () => {  
            const file = fileUpload2.files[0];  
            console.log("filesPlantilla")
            this.uploadFile(file,'filesPlantilla'); 
        };  
        fileUpload2.click();  
      }
    popImg(imgPath:string,array:string){
        this[array] = this[array].filter((img:string)=>{
            return img!==imgPath?true:false
        })
    }

}
