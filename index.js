const express = require("express")
const app = express()
const {join } = require("node:path")
const { createServer} = require("node:http")
const { Server } =  require('socket.io')

app.use(express.static(__dirname));// Make sure your HTML file is in the "public" directory


var mensagens = []
const server = createServer(app)
const io =  new Server(server);

app.get("/", (req, res) => {
    res.sendFile(join(__dirname, "index.html"))
})

io.on("connection", async (socket) => {
    console.log("cliente conectado", socket.id)


    socket.on("mensagem", (msg) => {
        console.log(msg)
        mensagens.push(msg)
        socket.emit("atualizar", msg)
        socket.broadcast.emit("atualizar", msg)
    })

    socket.emit("vermensagens", mensagens)


})

server.listen(3000, (err) => {
    console.log("http://localhost:3000/")
});


