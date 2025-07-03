import { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  PenTool,
  Settings,
  Menu,
  X
} from "lucide-react";

const AdminNav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden fixed top-21.5 left-4 z-50 p-2 bg-white rounded shadow"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-21.5 left-0 h-full bg-white border-r shadow-sm w-64 p-5 transition-transform z-40 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>

        <nav className="flex flex-col gap-4 text-gray-700">
          <Link to="/admin" className="flex items-center gap-3 hover:text-blue-600">
            <LayoutDashboard className="w-5 h-5" />
            ड्यासबोर्ड
          </Link>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600">
            <Users className="w-5 h-5" />
            प्रयोगकर्ता
          </a>
          <Link to="/admin/allposts" className="flex items-center gap-3 hover:text-blue-600">
            <FileText className="w-5 h-5" />
            पोस्टहरू
          </Link>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600">
            <PenTool className="w-5 h-5" />
            लेखकहरू
          </a>
          <a href="#" className="flex items-center gap-3 hover:text-blue-600">
            <Settings className="w-5 h-5" />
            सेटिङ
          </a>
        </nav>
      </aside>
    </>
  );
};

export default AdminNav;
