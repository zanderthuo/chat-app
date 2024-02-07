import express from 'express';
import http from 'http';
import cors from 'cors';
import { Server } from 'socket.io';

const app = express();

const server = http.createServer(app);

app.use(cors());

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:3000',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("user connected",socket.id)

    socket.on("join_room", (data) => {
        socket.join(data)
        console.log(`User with ID: ${socket.id} joined room: ${data}`)
    })

    socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id)
    })
})



server.listen(5000, () => {
    console.log("Server Running")
})