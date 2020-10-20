const auth = require('./auth.routes');
const usuarios = require('./usuarios.routes');
const categorias = require('./categorias.routes');
const productos = require('./productos.routes');
const correos = require('./correos.routes')
const servicios = require('./servicios.routes')
const pagos = require('./pagos.routes')
const flow = require('./flow.routes')
const subproductos= require('./subproductos.routes')
const sucursales= require('./sucursales.routes')
const stock = require('./stock.routes')
const contacto = require('./contacto.routes')
const carrito = require('./carritos.routes')

module.exports = (app,db,protegerRutas,multer) => {
    auth(app,db)
    usuarios(app,db)
    categorias(app,db)
    productos(app,db,multer);
    correos(app,db)
    servicios(app,db)
    pagos(app,db)
    flow(app,db)
    subproductos(app,db)
    sucursales(app,db)
    stock(app,db)
    contacto(app,db)
    carrito(app,db)
}