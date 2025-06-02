import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav"; // Sidebar only

const AdminLayout = () => {
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
