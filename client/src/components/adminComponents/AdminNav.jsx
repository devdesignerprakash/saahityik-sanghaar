import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
 FolderPen,
  Settings,
  Menu,
  X
} from "lucide-react";

<FolderPen />
const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-20 left-4 z-50 p-2 bg-white rounded shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-20 left-0 h-full bg-white border-r shadow-sm w-64 p-5 transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-4 text-gray-700">
          <Link to="/admin" className="flex items-center gap-3 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            <LayoutDashboard className="w-5 h-5" />
            ड्यासबोर्ड
          </Link>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            <Users className="w-5 h-5" />
            प्रयोगकर्ता
          </a>
          <Link to="/admin/posts" className="flex items-center gap-3 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            <FileText className="w-5 h-5" />
            पोस्टहरू
          </Link>
          <Link to='/admin/postTypes' className="flex items-center gap-3 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            <FolderPen className="w-5 h-5" />
           साहित्यका प्रकारहरु 
          </Link>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600" onClick={() => setIsOpen(false)}>
            <Settings className="w-5 h-5" />
            सेटिङ
          </a>
        </nav>
      </aside>
    </>
  );
};

export default AdminNav;
