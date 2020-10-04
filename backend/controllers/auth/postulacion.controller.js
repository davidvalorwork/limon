const messages = require('../default/messages.controller');
const bcrypt = require('bcrypt-nodejs');
const salt = bcrypt.genSaltSync(10);
module.exports={
  obtener_usuario:async(db,req,res)=>{
    const randomDigit = req.params.random_digit
    const usuario = await db.usuarios.findOne({where:{
      random_digit: randomDigit
    }})
    messages.success(usuario,res)
  },
  completar_registro:async(db,req,res)=>{
    req.body.clave = bcrypt.hashSync(req.body.clave,salt);
    const body = req.body
    const response = await db.usuarios.update(body,{where:{
      id_usuarios:body.id_usuarios
    }})
    messages.success(response,res)
  }
}