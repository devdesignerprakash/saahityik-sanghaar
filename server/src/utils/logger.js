import winston from 'winston'
import path from 'path'

const { createLogger, format, transports } = winston
const { combine, timestamp, printf, colorize, errors } = format

// Define log format
const logFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} ${level}: ${stack || message}`
})

// Create the logger
const logger = createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
        timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        errors({ stack: true }),
        logFormat
    ),
    transports: [
        // Write all logs to console
        new transports.Console({
            format: combine(
                colorize(),
                timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
                errors({ stack: true }),
                logFormat
            )
        }),
        // Write all logs to file
        new transports.File({ 
            filename: path.join(process.cwd(), 'logs', 'error.log'), 
            level: 'error' 
        }),
        new transports.File({ 
            filename: path.join(process.cwd(), 'logs', 'combined.log') 
        })
    ],
    exceptionHandlers: [
        new transports.File({ 
            filename: path.join(process.cwd(), 'logs', 'exceptions.log') 
        })
    ],
    rejectionHandlers: [
        new transports.File({ 
            filename: path.join(process.cwd(), 'logs', 'rejections.log') 
        })
    ]
})

export { logger }