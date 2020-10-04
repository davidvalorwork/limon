const route = `/contacto`;
const messages = require('../controllers/default/messages.controller')
const mail = require('../controllers/node-mailer/index')
module.exports = (app,db) => {
  app.post(`${route}`,(req,res)=>{
    mail.enviarMail(`tiendalimoncl0@gmail.com`,JSON.stringify(req.body),`CONTACTO`)
    messages.success("Mensaje enviado",res)
  });
}