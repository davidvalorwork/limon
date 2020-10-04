const crud = require('../controllers/default/crud.controller');
const route = `/productos`;
const {upload} = require('../controllers/productos/upload');
const funciones = require('../controllers/productos/aceptar-rechazar')

module.exports = (app,db,multer) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.productos,req,res));
    app.post(`${route}/condicion`,(req,res)=>crud
        .findByCondition(db.productos,req.body.condicion,res));
    app.post(`${route}`,(req,res)=>crud.create(db.productos,req,res));
    app.post(`${route}/aceptar`,(req,res)=>funciones.aceptar(db,req,res));
    app.post(`${route}/rechazar`,(req,res)=>funciones.rechazar(db,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.productos,req,res));
    app.post(`${route}/upload/product-img`,
        multer.single("file"),(req,res)=>upload(req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.productos,req,res));
}