import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Blog from './pages/Blog';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminLayout from './components/adminComponents/AdminLayout';
import Dashboard from './pages/adminPages/Dashboard';
import ViewPostContent from './components/adminComponents/ViewPostContent';
import ShowAllContents from './components/adminComponents/ShowAllContents';

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/blog/:title" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin/posts" element={<ShowAllContents />} />


        {/* Admin routes (protected inside AdminLayout) */}
        {/* <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="posts" element={<ShowAllContents/>} />
          <Route path="post/view/:postId" element={<ViewPostContent />} />
        </Route> */}
      </Routes>
    </>
  );
}

export default App;
