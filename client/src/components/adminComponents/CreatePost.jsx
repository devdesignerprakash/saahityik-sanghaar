import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";

const CreatePost = ({ onClose, post }) => {
  const [postType, setPostType] = useState([]);
  const [selectedType, setSelectedType] = useState("");
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPostType = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/postType/getAllPostTypes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        setPostType(response.data);
      }
    };

    fetchPostType().catch((error) => {
      console.error("Error fetching post types:", error.response?.data || error.message);
    });
  }, [token]);

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black opacity-30 z-40" />

      {/* Modal wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-lg bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-[90vh]">
          {/* ❌ Close Icon */}
          <button
            onClick={() => onClose(!post)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Header */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            साहित्य सिर्जना गर्नुहोस्
          </h2>

          {/* Form */}
          <form>
            <input
              type="text"
              placeholder="शीर्षक"
              className="block w-full mb-4 p-3 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="लेखकको नाम"
              className="block w-full mb-4 p-3 border border-gray-300 rounded"
            />
            <textarea
              placeholder="सामग्री लेख्नुहोस्..."
              className="block w-full mb-4 p-3 border border-gray-300 rounded h-32 resize-none"
            ></textarea>
            <input
              type="file"
              className="block w-full mb-4 border border-gray-300 rounded p-2"
            />

            {/* Dropdown for postType */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="block w-full mb-6 border border-gray-300 rounded p-3"
            >
              <option value="">पोस्टको प्रकार चयन गर्नुहोस्</option>
              {postType?.map((type) => (
                <option key={type._id} value={type.postType}>
                  {type.labelName}
                </option>
              ))}
            </select>

            <button
              type="submit"
              className="w-full bg-blue-700 text-white text-lg py-3 rounded hover:bg-blue-800"
            >
              सिर्जना गर्नुहोस्
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
