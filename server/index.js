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
import { logger } from './src/utils/logger.js'
import { rateLimiter, securityHeaders, cleanXSS } from './src/middlewares/security.middleware.js'

console.log('Starting server setup...')

dotenv.config()

const app = express()
const httpServer = createServer(app)

console.log('Express app created')

// Apply security middleware
app.use(rateLimiter)
app.use(securityHeaders)
app.use(cleanXSS)

console.log('Security middleware applied')

// Initialize Socket.IO with proper configuration
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CORS_ORIGINS?.split(',') || ["http://localhost:5173", "https://254mvr58-5173.inc1.devtunnels.ms"],
        credentials: true,
    }
})

app.set('io', io)

console.log('Socket.IO initialized')

// Middleware setup
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true, limit: '10mb' }))

console.log('Express middleware setup complete')

// CORS configuration
const corsOptions = {
    origin: process.env.CORS_ORIGINS?.split(',') || ["http://localhost:5173", "https://254mvr58-5173.inc1.devtunnels.ms"],
    credentials: true,
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))

console.log('CORS configured')

// Routes
console.log('Setting up routes...')
app.use('/api/user', userRouter)
console.log('User routes added')
app.use('/api/postType', postTypeRouter)
console.log('PostType routes added')
app.use('/api/post', postRouter)
console.log('Post routes added')

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({ 
        success: true,
        message: 'Server is running successfully',
        timestamp: new Date().toISOString()
    })
})

console.log('Health check endpoint set up')

// Socket.IO connection handling
io.on('connection', (socket) => {
    logger.info(`A user connected: ${socket.id}`)
    
    socket.on('message', (data) => {
        logger.debug(`Received message from ${socket.id}:`, data)
        socket.broadcast.emit('message', data)
    })

    socket.on('disconnect', () => {
        logger.info(`User disconnected: ${socket.id}`)
    })
})

console.log('Socket.IO connection handlers set up')

// Global error handler
app.use((err, req, res, next) => {
    logger.error('Unhandled error:', err)
    res.status(500).json({
        success: false,
        message: 'Internal server error',
        error: process.env.NODE_ENV === 'development' ? err.message : undefined
    })
})

console.log('Global error handler set up')

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    })
})

console.log('404 handler set up')

// Start server
const startServer = async () => {
    try {
        console.log('Connecting to database...')
        await dbConnection()
        logger.info('Database connected successfully')
        
        console.log('Initializing admin user...')
        initAdmin()
        logger.info('Admin user initialized')
        
        const PORT = process.env.PORT || 8000
        httpServer.listen(PORT, () => {
            logger.info(`Server is running on Port ${PORT}`)
        })
    } catch (error) {
        logger.error('Failed to start server:', error)
        process.exit(1)
    }
}

console.log('Starting server...')
startServer()

export default app