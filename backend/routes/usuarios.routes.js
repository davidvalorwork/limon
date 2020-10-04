const crud = require('../controllers/default/crud.controller');
const {pedir_usuario} = require('../controllers/auth/login.controller')
const {obtener_usuario, completar_registro} = require('../controllers/auth/postulacion.controller')
const route = `/usuarios`;

module.exports = (app,db) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.usuarios,req,res));
    app.get(`${route}/postulaciones`,(req,res)=>crud.findByCondition(db.usuarios,{
        where:{
            tiposUsuarioIdTiposUsuarios:4,
            borrado:0
        }
    },res));
    app.get(`${route}/:id`,(req,res)=>crud.find(db.usuarios,req,res))
    app.get(`${route}/postulacion/:random_digit`,(req,res)=>obtener_usuario(db,req,res))
    app.post(`${route}/postulacion/completar-registro`,(req,res)=>completar_registro(db,req,res))
    app.post(`${route}/:id`,(req,res)=>crud.update(db.usuarios,req,res))
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.usuarios,req,res));
}