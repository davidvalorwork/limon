const crud = require('../controllers/default/crud.controller');
const route = `/sucursales`;

module.exports = (app,db,multer) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.sucursales,req,res));
    app.post(`${route}/condicion`,(req,res)=>crud
        .findByCondition(db.sucursales,req.body.condicion,res));
    app.post(`${route}`,(req,res)=>crud.create(db.sucursales,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.sucursales,req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.sucursales,req,res));
}