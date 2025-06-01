import React from "react";
import {useNavigate} from 'react-router-dom'

const NavBar = () => {
    const navigate=useNavigate()

  return (
    <div className="flex justify-between items-center mx-8 py-5 sm:mx-20 xl:mx-32">
       <div className="cursor-pointer flex gap-2 text-2xl font-bold" onClick={() => navigate("/")}>
      <span className="text-red-600">साहित्यिक</span>
      <span className="text-blue-700">संघार</span>
    </div>
      <button className="flex gap-2 justify-center items-center text-white bg-blue-700 px-10 py-2.5 rounded-full cursor-pointer" onClick={()=>navigate("/login")}>
        लग-इन
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
          />
        </svg>
      </button>
    </div>
  );
};

export default NavBar;
