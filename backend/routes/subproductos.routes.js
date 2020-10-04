const crud = require('../controllers/default/crud.controller');
const route = `/subproductos`;

module.exports = (app,db) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.subproductos,req,res));
    app.post(`${route}/condicion`,(req,res)=>crud
        .findByCondition(db.subproductos,req.body.condicion,res));
    app.post(`${route}`,(req,res)=>crud.create(db.subproductos,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.subproductos,req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.subproductos,req,res));
}