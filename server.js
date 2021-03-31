const io = require('socket.io')(3000,{
  cors:{
    origin: "*",
  },
})
const users = {}
io.on('connection', socket =>{
  socket.on('new-user', name=>{
    users[socket.id] = name
    console.log(users)
    socket.broadcast.emit('user-connected', name)
  })
  socket.on('send-chat-message', message =>{
    socket.broadcast.emit('chat-message', {message: message, name: users[socket.id]})
  })
})
