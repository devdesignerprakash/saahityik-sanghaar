import express from 'express'
import {login, signUp } from '../controllers/auth.controller.js'
import { deleteUser, getAllUsers, getUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'

const userRouter = express.Router()

console.log('Setting up user routes...')

userRouter.post('/signup', signUp)
userRouter.post('/login', login)
userRouter.get('/allusers', getAllUsers)
userRouter.get('/getuser', verifyToken, getUser)
userRouter.delete('/deleteUser/:id', verifyToken, deleteUser)

console.log('User routes set up successfully')

export default userRouter