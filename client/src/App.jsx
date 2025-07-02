
import {Route, Routes} from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import NavBar from './components/NavBar'
import Login from './pages/Login'
import AdminLayout from './components/adminComponents/AdminLayout'
import Dashboard from './pages/adminPages/Dashboard'
import SignUp from './pages/SignUp'

function App() {
  

  return (
    <>
    <NavBar/>
  
      <Routes>
        <Route path="/" element={<Home/>}/>
         <Route path="/blog/:title" element={<Blog/>}/>
         <Route path="/login" element={<Login/>}/>
         <Route path="/signup" element={<SignUp/>}/>
         <Route path="/admin" element={<AdminLayout/>}>
         <Route index element={<Dashboard/>}/>
         </Route>
      </Routes>
    </>
  )
}

export default App
