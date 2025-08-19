import React from "react";
import { Outlet } from "react-router-dom";
import AdminNav from "./AdminNav";
import { FaBars } from "react-icons/fa";
import { useState } from "react";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-md fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden mr-4 text-gray-600 hover:text-gray-900"
            >
              <FaBars className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="flex flex-1 pt-16">
        {/* Sidebar */}
        <AdminNav isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

        {/* Content */}
        <main className="flex-1 md:ml-64 p-4 md:p-6 bg-gray-50 min-h-screen">
          <div className="bg-white rounded-lg shadow-sm p-4 md:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
