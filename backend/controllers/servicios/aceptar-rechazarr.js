const mail = require('../node-mailer/index')
const messages = require('../default/messages.controller')
module.exports={
  aceptar:async(db,req,res)=>{
    console.log(req.body)
    const {
      id_servicios,
      usuarioIdUsuarios
    } = req.body
    await db.servicios.update({estado:"Aceptado"},{where:{
      id_servicios:id_servicios
    }})
    const usuario = await db.usuarios.findOne({where:{id_usuarios:usuarioIdUsuarios}})
    const correo = usuario.dataValues.correo
    const subject = `Tienda Limón`
    const text = `Su servicio ha sido aceptado, felicidades.`
    const response = await mail.enviarMail(correo,text,subject,)
    messages.success(response,res)
  },
  rechazar:async(db,req,res)=>{
    console.log(req.body)
    const {
      id_servicios,
      usuarioIdUsuarios
    } = req.body

    await db.servicios.update({estado:"Rechazado"},{where:{
      id_servicios:id_servicios
    }})
    const usuario = await db.usuarios.findOne({where:{id_usuarios:usuarioIdUsuarios}})
    const correo = usuario.dataValues.correo
    const subject = `Tienda Limón`
    const text = `Su servicio ha sido aceptado, felicidades.`
    const response = await mail.enviarMail(correo,text,subject,)
    messages.success(response,res)
  },
}