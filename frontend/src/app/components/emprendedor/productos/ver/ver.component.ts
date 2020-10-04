
import { Component, OnInit,Inject, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoadingBarService } from '@ngx-loading-bar/core';
import { SnackBar} from '../../../../services/snackbar.service';
import {ProductosService} from '../../../../services/productos.service'
import {CategoriaService} from '../../../../services/categorias.service'
import {MatDialogRef,MAT_DIALOG_DATA} from '@angular/material/dialog'
import {UploadService} from '../../../../services/upload.service'
import {environment} from '../../../../../environments/environment'


@Component({
  selector: 'app-ver',
  templateUrl: './ver.component.html',
  styleUrls: ['./ver.component.css']
})
export class VerComponent implements OnInit {
    @ViewChild("fileUpload", {static: false}) fileUpload: ElementRef;
    @ViewChild("fileUpload2", {static: false}) fileUpload2: ElementRef;
    filesProduct  = []; 
    filesPlantilla  = []; 
    categoriasBD = [];

    url_api:string = `${environment.URL_API}/`

    imgRoute = `${environment.URL_API}/uploads/38a1be0c1416e6bd23e706e3535f3e95`

    form:FormGroup = this.fb.group({
        id_productos:new FormControl({value:this.data.id_productos,disabled:true}),
        nombre_producto:new FormControl({value:this.data.nombre_producto,disabled:true}),
        descripcion_producto:new FormControl({value:this.data.descripcion_producto,disabled:true}),
        precio:new FormControl({value:this.data.precio,disabled:true}),
        borrado:[this.data.borrado],
        nombre_id:['id_productos'],
        categoriaIdCategorias:new FormControl({value:this.data.categoriaIdCategorias,disabled:true})
    })

        constructor(
        public uploadService:UploadService,
        private fb: FormBuilder,
        private productoService:ProductosService,
        private loadingBar: LoadingBarService,
        private snackBar: SnackBar,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialogRef: MatDialogRef<VerComponent>,
        private categoriasService:CategoriaService,

        // private router:Router,
        ) { }

        ngOnInit(): void {
            this.categoriasService.getCategorias().subscribe((response:any)=>{
                console.log(response.payload)
                this.categoriasBD = response.payload
            })
            console.log(this.data.imagenes)
            this.filesProduct = this.data.imagenes.split(',')
            this.filesProduct = this.filesProduct.filter((img:string)=>{
                return img!==''?true:false;
            })
        }

    crear(producto:any){
        if(this.form.status !== "VALID") return true
        console.log(this.filesProduct.join(','))
        console.log(this.filesPlantilla.join(','))
        producto.urls_img = this.filesProduct.join(",")
        producto.urls_plantilla = this.filesPlantilla.join(',')
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

