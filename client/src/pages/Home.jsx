
import Header from '../components/Header'
import BlogList from '../components/BlogList'
import NewsLetter from '../components/NewsLetter'
import Footer from '../components/Footer'
import { useContext } from 'react'
import AuthContext from '../context/AuthContext'

const Home = () => {
  const {user}=useContext(AuthContext)
  console.log(user)
  return (
    <>
    <Header/>
    {user&&(
    <div className='flex justify-end items-end w-full '>
      <button className='p-2 bg-blue-700 rounded-md items-center justify-center text-white text-bold cursor-pointer'>Add Post</button>
    </div>)}
    <BlogList/>
    <NewsLetter/>
    <Footer/>
    </>
    
  )
}

export default Home