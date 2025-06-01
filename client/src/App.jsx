
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import NavBar from './components/NavBar'
import Login from './pages/Login'

function App() {
  

  return (
    <>
    <NavBar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/blog/:title" element={<Blog/>}/>
         <Route path="/login" element={<Login/>}/>
      </Routes>
    </>
  )
}

export default App
