import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.middleware.js'
import { createPostType, deletePostType, getAllPostTypes, updatePostType } from '../controllers/postType.controller.js'

const postTypeRouter= express.Router()

postTypeRouter.post('/add-postType',verifyToken,createPostType)
postTypeRouter.get('/getAllPostTypes',verifyToken,getAllPostTypes)
postTypeRouter.put('/updatePostType/:id',verifyToken,updatePostType)
postTypeRouter.delete('/deletePostType/:id',verifyToken,deletePostType)
export default postTypeRouter