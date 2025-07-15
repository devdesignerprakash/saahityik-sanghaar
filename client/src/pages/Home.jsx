
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import { useState } from 'react'
import CreatePost from '../components/adminComponents/CreatePost'
const Home = () => {
  const {user}=useContext(AuthContext)
  const [createPost,setCreatePost]=useState(false)
  return (
    <>
    <Header/>
    {user&&(
    <div className='flex justify-end items-end w-full '>
      <button className='p-2 bg-blue-700 rounded-md items-center justify-center text-white text-bold cursor-pointer'
      onClick={()=>setCreatePost(!createPost)}>Add Post</button>
    </div>)}
    <BlogList/>
    <NewsLetter/>
    <Footer/>
    {createPost&&(
       <CreatePost onClose={setCreatePost} post={createPost}/>
    )
    }
    </>
    
  )
}

export default Home