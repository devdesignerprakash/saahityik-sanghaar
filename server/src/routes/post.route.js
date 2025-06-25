import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'
import { comments, createPost, getPosts, likes } from '../controllers/post.controller.js'

const postRouter= express.Router()
postRouter.post('/create-post',verifyToken,createPost)
postRouter.get('/getPosts',verifyToken,getPosts)
postRouter.patch('/like/:postId',verifyToken,likes)
postRouter.patch('/comment/:postId',verifyToken,comments)

export default postRouter;