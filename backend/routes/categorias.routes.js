const crud = require('../controllers/default/crud.controller');
const route = `/categorias`;

module.exports = (app,db) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.categorias,req,res));
    app.get(`${route}/:id`,(req,res)=>crud.find(db.categorias,req,res));
    app.post(`${route}/condicion`,(req,res)=>crud
        .findByCondition(db.categorias,req.body.condicion,res));
    app.post(`${route}`,(req,res)=>crud.create(db.categorias,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.categorias,req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.categorias,req,res));
}