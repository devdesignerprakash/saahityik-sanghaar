import express from 'express'
import {login, signUp } from '../controllers/auth.controller.js'
import { deleteUser, getAllUsers, getUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'
const userRouter= express.Router()
userRouter.post('/signup',signUp)
userRouter.post('/login',login)
userRouter.get('/allusers',getAllUsers)
userRouter.get('/getuser',verifyToken,getUser)
userRouter.delete('/delete-user/:id',verifyToken,deleteUser)
export default userRouter