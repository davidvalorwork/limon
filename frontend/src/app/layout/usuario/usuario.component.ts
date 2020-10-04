import {
  Component,
} from '@angular/core';
import {UsuarioService} from '../../services/usuarios.service'
import {environment} from '../../../environments/environment'
import {CategoriaService} from '../../services/categorias.service'

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent  {
  url_usuario_img:string = '';
  url_api:string = `${environment.URL_API}/`
  registrado:boolean=false;
  categorias = []
  usuario;

  constructor(
    public usuarioService: UsuarioService,
    public categoriaService: CategoriaService
  ) {
    const id_usuarios = localStorage.getItem("id_usuarios")
    console.log(id_usuarios)
    this.categoriaService.getCategorias().subscribe((response:any)=>{
      this.categorias = response.payload
    })
    if(id_usuarios){
      this.registrado = true
      this.usuarioService.getUsuario(id_usuarios).subscribe((response:any)=>{
        console.log(response.payload)
        if(response.payload.tiposUsuarioIdTiposUsuarios === 1){
          this.usuario = response.payload
        }
      })
    }
  }

  logout(){
    localStorage.clear()
  }
}
