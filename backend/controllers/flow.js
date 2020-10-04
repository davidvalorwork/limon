
const config = require("../config.json");
const axios = require("axios");
const CryptoJS = require("crypto-js")
const messages = require('../controllers/default/messages.controller')
const mail = require('../controllers/node-mailer/index')
// const db = require('../database/db');
// const enviarCorreo = require("./mailCtrl")


const flow = {
    pago: async(db,req,res)=>{
        console.log('pago')
        const {
            monto,
            id_pagos
        } = req.body
        console.log(req.body)
        const commerceOrder = Math.floor(Math.random() * (200000000 - 1100 + 1)) + 11000000
        console.log(commerceOrder)
        try{
            console.log("Dentro del try")
            let params = {
                "apiKey":config.apiKey,
                "subject": `Tienda Limon Web Pay`,
                "currency": "CLP",
                "amount": monto,
                "email": "tiendalimoncl0@gmail.com",
                "commerceOrder": commerceOrder,
                "urlConfirmation": config.baseURL,
                "urlReturn": config.frontURL ,
            };
            let data = await getPack(params);
            let firma = await firmar(params)
            const serviceName = "payment/create";
            const url =`${config.apiURL}/${serviceName}`;
            axios.post(url,`${data}&s=${firma}`).then(async(data)=>{
                // console.log(data.data)
                let response = data.data
                console.log(id_pagos)
                // const pago = await db.pagos.findOne({where:{id_pagos}})
                // console.log(pago)
                const response2 = await db.pagos.update({
                    token:response.token,
                    estatus_pago:"Pendiente Por Pagar"
                },{where:{id_pagos:id_pagos}})
                console.log(response2)
                let redirect = response.url + "?token=" + response.token;
                console.log(response)
                messages.success(redirect,res)
            })
            .catch(error => {
                console.log(error)
                console.log("A ocurrido un error antes de enviar el post")
                res.send("A ocurrido un error por favor vuelva a intentar.")
            });
        }catch(error) {
            console.log(error)
            res.send('error')
        }
    },
    result: async(db,req,res)=>{
        console.log("Respuesta de pago realizado")
        console.log(req.body.token)
        const pago = await db.pagos.findOne({where:{token:req.body.token}})
        console.log(pago)
        pago.estatus_pago = "Pagado"
        await pago.save()
        console.log(pago.dataValues.stockIdStock)
        if(pago.dataValues.stockIdStock){
            const stock = await db.stock.findOne({where:{id_stock:pago.dataValues.stockIdStock}})
            console.log(stock)
            stock.cantidad = parseInt(stock.cantidad) - parseInt(pago.cantidad)
            console.log(stock)
            stock.save()
        }
        usuario = await db.usuarios.findOne({where:{id_usuarios:pago.usuarioIdUsuarios}})
        mail.enviarMail(usuario.correo,`Compra exitosa`,`Tienda Limón Web Pay`)
        res.status(200).send("ok")
    },
    resultPrueba: async(db,req,res)=>{
        console.log("Respuesta de pago realizado")
        console.log(req.body.token)
        const pago = await db.pagos.findOne({where:{id_pagos:1}})
        console.log(pago)
        pago.estado = "Pagado"
        await pago.save()
        const pedido = await db.pedidos.findOne({where:{id_pedidos:pago.dataValues.pedidoIdPedidos}})
        pedido.estadosPedidoIdEstadosPedidos = 3
        await pedido.save()
        console.log(pedido)
        const detalle = await db.detalles_pedidos.findOne({where:{pedidoIdPedidos:pedido.dataValues.id_pedidos}})
        console.log(detalle)
        const precio = await db.precios.findOne({where:{id_precios:detalle.dataValues.precioIdPrecios}})
        console.log(precio)
        const producto = await db.productos.findOne({where:{id_productos:precio.dataValues.productoIdProductos}})
        producto.stock = parseInt(producto.stock) - parseInt(detalle.cantidad)
        producto.save()
        res.status(200).send("ok")
    },
    pago_realizado: async(req,res)=>{
        console.log(req.body)
        const {order_id} = req.body
        db.query(`UPDATE ordenes SET estado='pago' WHERE id=${order_id}`,(err,result)=>{
            if(err){
                res.json({ok:false,msj:"no se pudo eliminar la orden"})
            }else{
                res.json({ok:true,msj:"orden pagada",result})
            }
        })
        // res.send("ok")
    }
}

const firmar = async(params) => {
    const keys = Object.keys(params)
      .map(key => key)
      .sort((a, b) => {
        if (a > b) return 1;
        else if (a < b) return -1;
        return 0;
      });
    let toSign = [];
    keys.map(key => {
      toSign.push(key + "=" + params[key]);
    });
    toSign = toSign.join("&");

    return CryptoJS.HmacSHA256(toSign, config.secretKey);
  }
const getPack =async(params) => {
const keys = Object.keys(params)
    .map(key => key)
    .sort((a, b) => {
    if (a > b) return 1;
    else if (a < b) return -1;
    return 0;
    });
let data = [];
keys.map(key => {
    data.push(key + "=" + params[key]);
});
return data.join("&");
}
module.exports = flow



// CREDENCIALES CLIENTE
// {
//   "apiKey": "2EF9AF26-A2DB-40DF-8A99-953A0BA87L32",
//   "secretKey": "358a67d403dabed24d8695b3cfd99ee8daf3e492",
//   "apiURL": "https://www.flow.cl/api",
//   "baseURL": "http://18.218.87.159:3030/flow",
//   "frontURL":"http://18.218.87.159/"
// }
