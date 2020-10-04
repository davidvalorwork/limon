const crud = require('../controllers/default/crud.controller');
const route = `/stock`;

module.exports = (app,db,multer) => {
    app.get(`${route}`,(req,res)=>crud.findAll(db.stock,req,res));
    app.post(`${route}/condicion`,(req,res)=>crud
        .findByCondition(db.stock,req.body.condicion,res));
    app.post(`${route}`,(req,res)=>crud.create(db.stock,req,res));
    app.post(`${route}/:id`,(req,res)=>crud.update(db.stock,req,res));
    app.delete(`${route}/:id`,(req,res)=>crud.delete(db.stock,req,res));
}