const crud = require('../controllers/default/crud.controller');
const route = `/servicios`;
const funciones = require('../controllers/servicios/aceptar-rechazarr')

module.exports = (app,db,multer) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.servicios,req,res));
    app.post(`${route}/condicion`,(req,res)=>crud
        .findByCondition(db.servicios,req.body.condicion,res));
    app.post(`${route}`,(req,res)=>crud.create(db.servicios,req,res));
    app.post(`${route}/aceptar`,(req,res)=>funciones.aceptar(db,req,res));
    app.post(`${route}/rechazar`,(req,res)=>funciones.rechazar(db,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.servicios,req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.servicios,req,res));
}