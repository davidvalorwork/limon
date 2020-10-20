const messages = require('../default/messages.controller')
module.exports=async(db,req,res)=>{
  console.log(req.body)
  const carrito = req.body.carrito
  let pedido = req.body.pedido
  console.log(pedido)
  const result = await db.carrito.create(carrito)
  console.log(result.dataValues)
  pedido.carritoIdCarrito = result.dataValues.id_carrito
  const resultPedido = await db.pedidos.create(pedido)
  messages.success({carrito:result,pedido:resultPedido},res)
}