const crud = require('../controllers/default/crud.controller');
const route = `/pagos`;

module.exports = (app,db) => {
  app.get(`${route}`,(req,res)=>crud.findAll(db.pagos,req,res));
  app.post(`${route}/condicion`,(req,res)=>crud
      .findByCondition(db.pagos,req.body.condicion,res));
  app.post(`${route}`,(req,res)=>crud.create(db.pagos,req,res));
  app.post(`${route}/:id`,(req,res)=>crud.update(db.pagos,req,res));
  app.delete(`${route}/:id`,(req,res)=>crud.delete(db.pagos,req,res));
}