import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { dbConnection } from './src/configuration/database.config.js'
import userRouter from './src/routes/user.route.js'
import postTypeRouter from './src/routes/postType.route.js'
import postRouter from './src/routes/post.route.js'
import { initAdmin } from './src/utils/admin.js'
dotenv.config()
const app = express()
const httpServer = createServer(app)

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:5173", "https://254mvr58-5173.inc1.devtunnels.ms"],
        credentials: true,
    }
})
app.set('io', io)
//middlewares
app.use(express.json())
app.use(cors(
    {
        origin: ["http://localhost:5173", "https://254mvr58-5173.inc1.devtunnels.ms"],
        credentials: true
    }
))

app.use('/api/user', userRouter)
app.use('/api/postType', postTypeRouter)
app.use('/api/post', postRouter)

//socketLogic
io.on('connection', (socket) => {
    console.log('A user connected:', socket.id)

    socket.on('message', (data) => {
        console.log('Received message:', data)
        // broadcast to all clients except sender
        socket.broadcast.emit('message', data)
    })

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id)
    })
})
httpServer.listen(process.env.PORT, () => {
    dbConnection().then(() => {
        console.log('database is connected successfully')
    }).catch((error) => console.log(error))
    initAdmin()
    console.log(`server is running on Port ${process.env.PORT}`)
})