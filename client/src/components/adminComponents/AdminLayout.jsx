import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav"; // Sidebar only
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AdminLayout = () => {
  const {user, isLoading}= useContext(AuthContext)
  if (isLoading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  if (!user || user.userType !== 'admin') {
    return <div className="flex items-center justify-center h-screen">Access Denied</div>;
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
