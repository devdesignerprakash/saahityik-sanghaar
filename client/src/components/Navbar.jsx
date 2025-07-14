import React, { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);
 
  const handleLogoutClicked = () => {
    logout(); 
    navigate("/") // Redirect to home after logout
  }

  return (
    <div className="flex justify-between items-center mx-8 py-5 sm:mx-20 xl:mx-32">
      {/* Logo */}
      <div className="cursor-pointer flex gap-2 text-2xl font-bold" onClick={() => navigate("/")}>
        <span className="text-red-600">साहित्यिक</span>
        <span className="text-blue-700">सङ्घार</span>
      </div>

      {/* Right-side */}
      <div className="flex gap-4 items-center">
        {user && (
          <>
            <div className="text-gray-700 font-semibold">
            नमस्ते, {user.fullName}, स्वागत छ!
            </div>
            <button
              className="flex gap-2 justify-center items-center text-white bg-red-600 px-6 py-2 rounded-full hover:bg-red-700 transition cursor-pointer"
              onClick={handleLogoutClicked}
            >
              Logout
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                />
              </svg>
            </button>
          </>
        )}
          <button
           className={`flex gap-2 justify-center items-center text-white bg-blue-700 px-10 py-2.5 rounded-full hover:bg-blue-800 transition cursor-pointer ${user ? "hidden" : ""}`}
            onClick={() => navigate("/login")}
          >
            लग-इन
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
              />
            </svg>
          </button>
      </div>
    </div>
  );
};

export default NavBar;
