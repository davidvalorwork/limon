const route = `/flow`;
const flow = require('../controllers/flow')
module.exports = (app,db) => {
  app.post(`${route}`,(req,res)=>flow.pago(db,req,res));
  app.post(`${route}/result`,(req,res)=>flow.result(db,req,res));
}