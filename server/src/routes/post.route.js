import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'
import { comments, createPost, getPostById, getPosts, likes } from '../controllers/post.controller.js'
import optionalImageUpload from '../middlewares/image.middleware.js'

const postRouter= express.Router()
postRouter.post('/create-post',verifyToken,optionalImageUpload,createPost)
postRouter.get('/getPost/:postId',verifyToken,getPostById)
postRouter.get('/getPosts',verifyToken,getPosts)
postRouter.patch('/like/:postId',verifyToken,likes)
postRouter.patch('/comment/:postId',verifyToken,comments)

export default postRouter;