import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './src/configuration/database.config.js'
import userRouter from './src/routes/user.route.js'
dotenv.config()
const app= express()
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.listen(process.env.PORT,()=>{
    dbConnection().then(()=>{
        console.log('database is connected successfully')
    }).catch((error)=>console.log(error))
    console.log(`server is running on Port ${process.env.PORT}`)
})