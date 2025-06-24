import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'
import { createPost } from '../controllers/post.controller.js'

const postRouter= express.Router()
postRouter.post('/create-post',verifyToken,createPost)

export default postRouter;