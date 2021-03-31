const socket = io('http://localhost:3000')
const messageForm = document.getElementById("send-container")
const messageInput = document.getElementById("message-input")
const messageContainer = document.getElementById("message-container")
name = prompt()

añadirMensaje("Te has Unido")
socket.emit('new-user', name)

socket.on('chat-message', data =>{
  añadirMensaje(data.name + ": " + data.message)
})
socket.on('user-connected', name =>{
  añadirMensaje(name + " se ha conectado")
})

messageForm.addEventListener('submit', event =>{
  event.preventDefault() //Evitamos el refresco al pulsar el boton
  const message = messageInput.value
  socket.emit('send-chat-message', message)
  console.log("enviado")
  messageInput.value = ""
})

function añadirMensaje(message){
  const messageElement = document.createElement('div')
  messageElement.innerText = message
  messageContainer.append(messageElement)
}
