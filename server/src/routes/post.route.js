import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'
import { comments, createPost, deletePost, editPost, getPostById, getPosts, getPublishedPosts, likes, published } from '../controllers/post.controller.js'
import optionalImageUpload from '../middlewares/image.middleware.js'

const postRouter= express.Router()
postRouter.post('/create-post',verifyToken,optionalImageUpload,createPost)
postRouter.put('/update-post/:postId',verifyToken,optionalImageUpload,editPost)
postRouter.get('/getPublishedPost',verifyToken,getPublishedPosts)
postRouter.get('/getPost/:postId',verifyToken,getPostById)
postRouter.get('/getPosts',verifyToken,getPosts)
postRouter.patch('/published/:postId',verifyToken,published)
postRouter.patch('/like/:postId',verifyToken,likes)
postRouter.patch('/comment/:postId',verifyToken,comments)
postRouter.delete('/delete-post/:id',verifyToken,deletePost)

export default postRouter;