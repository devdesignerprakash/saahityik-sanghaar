import { Outlet, Navigate } from "react-router-dom";
import AdminNav from "./AdminNav"; // Sidebar only
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AdminLayout = () => {
  const {user, isLoading, token}= useContext(AuthContext)
  
  // Wait for authentication to complete
  if (isLoading || (token && !user)) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If no token or user, redirect to login
  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }
  
  // If user is not admin, redirect to home
  if (user.userType !== 'admin') {
    return <Navigate to="/" replace />;
  }
  return (
    <>
    <div className="flex min-h-screen">
  {/* Sidebar */}
  <aside className="w-64 bg-white border-r">
    <AdminNav />
  </aside>

  {/* Main Content */}
  <main className="flex-1 p-6 bg-gray-100">
    <Outlet />
  </main>
</div>
    </>
  
  );
};

export default AdminLayout;
