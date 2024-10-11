const io = require('socket.io-client')
const socket = io("http://localhost:3000")

socket.on("connection", () => {
  console.log("Conectado ao servidor:")

  socket.emit("message", "Ola servidor")

  socket.on("vermensagens", (data) => {
    console.log(data)
  })
})





