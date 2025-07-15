import React from "react";
import axios from "axios";
import { convertToNepaliUnicode } from "../utils/preetiToUnicode";
import {toast} from "react-toastify";

const Header = ({setSearchPosts}) => {
  const handleUnicodeConversion = (text) => {
    return convertToNepaliUnicode(text);
  }
  const handleSearch=(e) => {
    e.preventDefault();
    try{
      const searchQuery = e.target[0].value.trim();
      if (searchQuery) {
       axios.get(`http://localhost:8000/api/post/search?query=${searchQuery}`)
          .then(response => {
           setSearchPosts (response.data);
          })
          .catch(error => {
            toast.error("माफ गर्नुहोस्, तपाईँको खोजी भेटिएन।");
          });
      } else {
        console.warn("Search query is empty");
      }
      e.target.reset();
    }catch(error){
      console.error("Error during search:", error);
    }
  }
  return (
    <>
      <div className="px-4 sm:px-8 xl:px-24 py-12 relative max-w-4xl mx-auto text-center">
        <h1 className="text-3xl sm:text-4xl xl:text-5xl font-bold text-red-600">
          स्वागत छ — साहित्यिक सङ्घारमा
        </h1>

        <p className="mt-6 text-base sm:text-lg text-gray-800 leading-relaxed">
         शब्द, श्रृङ्गार र र्सिजनाको दुनियाँमा।
        </p>

        <p className="mt-4 text-sm sm:text-base text-gray-500 leading-relaxed">
          यहाँ हरेक अक्षरले अर्थ बोकेको छ, हरेक कथा आत्मा छुन्छ। कविता, कथा,
          निबन्ध, संस्मरण वा समीक्षा — साहित्यको गहिराइमा पर्न खोज्ने प्रत्येक
          आत्माका लागि एक विश्रामस्थल यहाँहरुकै साहित्य घर “साहित्यिक सङ्घार ।
        </p>

        {/* Search Form */}
        <form className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4" onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="यहाँ खोज्नुहोस्..."
            className="w-full sm:w-80 px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-900 transition duration-150"
            onChange={(e) => e.target.value = handleUnicodeConversion(e.target.value)}
          />
          <button
            type="submit"
            className="flex items-center gap-2 bg-blue-700 hover:bg-red-600 text-white px-4 py-2 rounded-md transition duration-150"
          >
            खोज्नुहोस्
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5"
              
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
              />
            </svg>
          </button>
        </form>
      </div>
    </>
  );
};

export default Header;
