import {
  Component, OnInit,
} from '@angular/core';
import {UsuarioService} from '../../services/usuarios.service'
import {environment} from '../../../environments/environment'
import {Socket} from 'ngx-socket-io'
import {ProductosService} from '../../services/productos.service'

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls:['./admin.component.css']
})
export class AdminComponent implements OnInit {
  url_usuario_img:string = undefined;
  url_api:string = `${environment.URL_API}/`
  postulaciones=[]
  productos=[]
  notificaciones = []
  number_notifications:number=0

  constructor(
    public usuarioService: UsuarioService,
    private socket: Socket,
    private productoService:ProductosService,
  ) {
  //  this.usuarioService.getUsuario(localStorage.getItem('id_usuarios')).subscribe((response:any)=>{
  //    console.log(response.payload)
  //    response.payload.url_img ===null?null:this.url_usuario_img = response.payload.url_img
  //    console.log(this.url_usuario_img)
  //  })
  this.usuarioService.getPostulaciones().subscribe((response:any)=>{
    this.postulaciones = response.payload
    console.log(this.postulaciones)
   })
   this.socket.on('nueva_postulacion',()=>{
    this.usuarioService.getPostulaciones().subscribe((response:any)=>{
      this.postulaciones = response.payload
      console.log(this.postulaciones)
      for(let i in this.postulaciones){
        this.postulaciones[i].router = '/admin/usuarios';
        this.postulaciones[i].nombre = "Nueva postulación.";
        this.postulaciones[i].icon = 'account_circle';
        this.notificaciones.push(this.postulaciones[i])
      }
     })
   })

   this.productoService.getByCondition({condicion:{where:{estado:"En Revisión",borrado:"0"}}})
   .subscribe((respuesta:any)=>{
      console.log(respuesta.payload)
      this.productos = respuesta.payload
      for(let i in this.productos){
        this.productos[i].router = '/admin/productos'
        this.productos[i].nombre = 'Nuevo producto sin revisar.'
        this.productos[i].icon = 'add_shopping_cart'
        this.notificaciones.push(this.productos[i])
      }
   })
  }
  ngOnInit(){
  }
  logout(){
    localStorage.clear()
  }
  
}
