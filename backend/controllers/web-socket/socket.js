var usuarios = []

module.exports={
  init:(app)=>{
    const socketIO = require('socket.io');
    const server = require('http').createServer();
    server.listen(3100,()=>{
      console.log("Socket escuchando en el puerto 3009 address: http://localhost:3009")
    });
    const io = socketIO(server)


    io.on('connection', function(socket) {
      console.log('Un cliente se ha conectado');      
      socket.on('hola',(socket)=>{
        console.log("como estas")
      })

      socket.on('login',(user)=>{
        const usuario = {
          id_usuario:user.id_usuario,
          tipo_usuario:user.tipo_usuario,
          socket_id:socket.id,
        }
        usuarios.push(usuario)
      })

      socket.on('postulacion',()=>{
        console.log('postulacion')
        usuarios.map((user)=>{
          console.log(user)
          user.tipo_usuario===3?io.to(user.socket_id).emit("nueva_postulacion"):null
        })
      });




    });
  }
}