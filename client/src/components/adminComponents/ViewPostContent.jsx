import React from 'react'

const ViewPostContent = ({post}) => {
    console.log("********************************",post)
  return (
    <>
    <div>
        <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
        <p className='text-gray-700 mb-4'>{post.content}</p>
        <div className='flex justify-between items-center'>
            <span className='text-sm text-gray-500'>लेखक: {post.author}</span>
            <span className='text-sm text-gray-500'>मिति: {new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
    </div>
    </>
  )
}

export default ViewPostContent