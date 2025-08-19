import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  FolderPen,
  Settings,
  LogOut
} from "lucide-react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";

const AdminNav = ({ isOpen, setIsOpen }) => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);

  const navItems = [
    { name: "ड्यासबोर्ड", icon: LayoutDashboard, path: "/admin" },
    { name: "प्रयोगकर्ता", icon: Users, path: "/admin/users" },
    { name: "पोस्टहरू", icon: FileText, path: "/admin/posts" },
    { name: "साहित्यका प्रकारहरु", icon: FolderPen, path: "/admin/postTypes" },
    { name: "सेटिङ", icon: Settings, path: "/admin/settings" }
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className={`fixed md:static bg-white border-r shadow-sm w-64 h-full p-5 transition-transform z-40 ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0 flex flex-col`}>
      <div className="flex flex-col h-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Admin Panel</h2>

        <div className="flex flex-col gap-2 text-gray-700 flex-grow">
          {navItems.map((item, index) => (
            <Link 
              key={index} 
              to={item.path} 
              className={`flex items-center gap-3 p-3 rounded-lg transition-colors ${
                isActive(item.path)
                  ? "bg-blue-100 text-blue-600 font-medium"
                  : "hover:bg-gray-100 hover:text-blue-600"
              }`}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </div>

        {/* Logout button at the bottom */}
        <button
          onClick={logout}
          className="flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
        >
          <LogOut className="w-5 h-5" />
          लगआउट
        </button>
      </div>
    </nav>
  );
};

export default AdminNav;
