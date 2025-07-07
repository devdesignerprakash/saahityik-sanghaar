import React from 'react'
import {useLocation} from 'react-router-dom'

const ViewPostContent = () => {
  const location = useLocation();
  const post = location.state?.post || {}; // Get post from location state or default to empty object
    console.log("********************************",post.content)
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
            <button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
                {post.status === 'published' ? 'प्रकाशित' : 'प्रकाशन गर्नुहोस्'}
            </button>
            <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600'>
                मेटाउनुहोस्                                                                    
              </button>
        </div>
    </div>
    </>
  )
}

export default ViewPostContent