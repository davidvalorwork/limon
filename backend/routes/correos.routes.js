const mailer = require('../controllers/node-mailer/index');
const route = `/correos`;

module.exports = (app,db) => {
    app.post(`${route}/postulacion-rechazada`,(req,res)=>mailer.postulacion_rechazada(req.body.usuario,req.body.description,res));
    app.post(`${route}/postulacion-aceptada`,(req,res)=>mailer.postulacion_aceptada(db.usuarios,req,res))
}