const nodemailer = require("nodemailer");
const messages = require('../default/messages.controller')
const config = require('../../config')
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port:'465',
  auth: {
    user: 'tiendalimoncl0@gmail.com', // colocar usuario gmail con bajo nivel de seguridad
    pass: 'tiendalimoncl012345'//password de ese user
  }
});
module.exports={
  postulacion_rechazada:(usuario,description,res)=>{
    
    // Definimos el email
    const mailOptions = {
      from: "hellomundotest2@gmail.com",// mismo correo definido arriba
      to: usuario.correo,//correo al que se le va a enviar el mensaje
      subject: "Limón MarketPlace",
      text:`Buenas ${usuario.razon_social}. Su postulación ha sido revisada por nuestro equipo, y ha sido rechazada por el siguiente motivo. ${description}`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions)
    .then(function (email) {
      messages.success("Message send",res)
    }).catch(function (exception) {
      console.log(exception)
      messages.error(exception,res)
    });
  },
  postulacion_aceptada:(table,req,res)=>{
    console.log(req.body)
    const usuario = req.body
    const randomDigit = randomStr(10,'12345abcde')
    console.log(randomDigit)

    table.update({random_digit:randomDigit, tiposUsuarioIdTiposUsuarios:2},{
      where:{id_usuarios:usuario.id_usuarios}
    })

    const mailOptions = {
      from: "testhellomundochile@gmail.com",// mismo correo definido arriba
      to: usuario.correo,//correo al que se le va a enviar el mensaje
      subject: "Limón MarketPlace",
      text:`Buenas ${usuario.razon_social}. Su postulación ha sido revisada por nuestro equipo, y ha sido aceptada, por el siguiente link puede continuar su registro. 
      ${config.URL_FRONT}/completar-registro/${randomDigit}`
    };
    // Enviamos el email
    transporter.sendMail(mailOptions)
    .then(function (email) {
      messages.success("Message send",res)
    }).catch(function (exception) {
      console.log(exception)
      messages.error(exception,res)
    });
  },
  enviarMail:async(correo, text, subject)=>{
    const mailOptions = {
      from: "testhellomundochile@gmail.com",// mismo correo definido arriba
      to: correo,//correo al que se le va a enviar el mensaje
      subject,
      text
    };
    // Enviamos el email
    await transporter.sendMail(mailOptions)
    .then(function (email) {
      return true
    }).catch(function (exception) {
      console.log(exception)
      return false
    });
  }
}

function randomStr(len, arr) { 
  var ans = ''; 
  for (var i = len; i > 0; i--) { 
      ans +=  
        arr[Math.floor(Math.random() * arr.length)]; 
  } 
  return ans; 
} 


//Cuenta
//tiendalimoncl0@gmail.com
//tiendalimoncl012345