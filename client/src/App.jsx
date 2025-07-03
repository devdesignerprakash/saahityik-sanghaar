import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import Blog from './pages/Blog';
import NavBar from './components/NavBar';
import Login from './pages/Login';
import AdminLayout from './components/adminComponents/AdminLayout';
import Dashboard from './pages/adminPages/Dashboard';
import SignUp from './pages/SignUp';
import AdminProtectedRoute from './components/adminComponents/AdminProtectedRoute';
import AuthContext from './context/AuthContext';
import { useContext, useEffect } from 'react';
import ShowALLPosts from './components/adminComponents/ShowALLPosts';

function App() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.userType === 'admin'&& window.location.pathname === '/') {
      navigate('/admin');
    }
  }, [user, navigate]);

  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog/:title" element={<Blog />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {user && user.userType === 'admin' && (
          <Route
             path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout />
              </AdminProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="allposts" element={<ShowALLPosts/>} />
          </Route>
        )}
      </Routes>
    </>
  );
}

export default App;
