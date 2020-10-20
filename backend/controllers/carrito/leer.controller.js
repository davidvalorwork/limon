const messages = require('../default/messages.controller')
module.exports=async(db,req,res)=>{
  const usuario = req.params.id
  const carritos = await db.carrito.findAll({where:{usuarioIdUsuarios:usuario,estado_carrito:"Por Pagar"}})
  console.log(carritos)
  for(let i in carritos){
    const pedidos = await db.pedidos.findAll({where:{carritoIdCarrito:carritos[i].dataValues.id_carrito,borrado:0}})
    carritos[i].dataValues.pedidos = pedidos
    let pedidosInfo = []
    for(let x in pedidos){
      console.log(pedidos[x].dataValues)
      if(pedidos[x].stockIdStock){
        const stock = await obtenerStock(db.stock,pedidos[x].stockIdStock)
        const subproducto = await obtenerSubProducto(db.subproductos,stock.subproductoIdSubproductos)
        const producto = await obtenerProducto(db.productos,subproducto.productoIdProductos)
        const pedidoInfo = {
          stock,
          subproducto,
          producto
        }
        pedidosInfo.push(pedidoInfo)
      }else{
        const service = await db.servicios.findAll({where:{id_servicios:pedidos[x].servicioIdServicios}})
        const pedidoInfo = {
          service:service[0],
        }
        pedidosInfo.push(pedidoInfo);
      }
    }
    carritos[i].dataValues.pedidosInfo = pedidosInfo
  }
  // const pedidos = await db.pedidos.findAll({where:{carritoIdCarrito:carritos.id_carrito,borrado:0}})
  messages.success(carritos,res)
}

async function obtenerStock(db,id_stock){
  const stock = await db.findAll({where:{id_stock}})
  return stock[0].dataValues
}
async function obtenerSubProducto(db,id_subproductos){
  const subproducto = await db.findAll({where:{id_subproductos}})
  return subproducto[0].dataValues
}
async function obtenerProducto(db,id_productos){
  const producto = await db.findAll({where:{id_productos}})
  return producto[0].dataValues;
}
