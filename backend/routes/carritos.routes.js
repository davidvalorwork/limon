const crud = require('../controllers/default/crud.controller');
const leer = require('../controllers/carrito/leer.controller');
const crear = require('../controllers/carrito/crear.controller')
const actualizar = require('../controllers/carrito/actualizar.controller')
const route = `/carrito`;

module.exports = (app,db) => {
  app.get(`${route}/:id`,(req,res)=>leer(db,req,res));
  app.post(`${route}/`,(req,res)=>crear(db,req,res));
  app.put(`${route}/`,(req,res)=>actualizar(db,req,res));
}