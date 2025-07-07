import React from 'react'
import {useLocation} from 'react-router-dom'

const ViewPostContent = () => {
  const location = useLocation();
  const post = location.state?.post || {}; // Get post from location state or default to empty object
    console.log("********************************",post)
  if (!post || Object.keys(post).length === 0) {
    return <div className='text-red-500'>पोस्ट फेला परेन।</div>;
  }
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