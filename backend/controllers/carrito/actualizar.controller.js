const messages = require('../default/messages.controller')
module.exports=async(db,req,res)=>{
  if(req.body.type === "Agregar")agregar(db,req,res)
  if(req.body.type === "Eliminar")eliminar(db,req,res)
}

async function agregar(db,req,res){
  console.log(req.body)
  const usuario = req.body.usuario
  let pedido = req.body.pedido
  console.log(pedido)
  const result = await db.carrito.findAll({where:{usuarioIdUsuarios:usuario,borrado:0}})
  console.log(result[0].dataValues)
  pedido.carritoIdCarrito = result[0].dataValues.id_carrito
  const resultPedido = await db.pedidos.create(pedido)
  messages.success({pedido:resultPedido},res)
}
async function eliminar(db,req,res){
  // const usuario = req.body.usuario
  const id_pedidos = req.body.pedido
  // const result = await db.carrito.findAll({where:{usuarioIdUsuarios:usuario,borrado:0}})
  const resultPedido = await db.pedidos.update({borrado:1},{where:{id_pedidos}})
  messages.success(resultPedido,res)
}