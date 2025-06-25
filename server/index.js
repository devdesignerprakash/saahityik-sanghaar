import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { dbConnection } from './src/configuration/database.config.js'
import userRouter from './src/routes/user.route.js'
import postTypeRouter from './src/routes/postType.route.js'
import postRouter from './src/routes/post.route.js'
import { initAdmin } from './src/utils/admin.js'
dotenv.config()
const app= express()
app.use(express.json())
app.use(cors())

app.use('/api/user',userRouter)
app.use('/api/postType',postTypeRouter)
app.use('/api/post',postRouter)
app.listen(process.env.PORT,()=>{
    dbConnection().then(()=>{
        console.log('database is connected successfully')
    }).catch((error)=>console.log(error))
    initAdmin()
    console.log(`server is running on Port ${process.env.PORT}`)
})