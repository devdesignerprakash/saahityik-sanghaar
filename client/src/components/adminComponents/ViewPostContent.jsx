import React, { useContext } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import {toast} from 'react-toastify'

const ViewPostContent = () => {
  const location = useLocation();
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const post = location.state?.post || null;
  if (!post) return null;
  const formattedDate = new Date(post.publishedAt).toLocaleDateString("ne-NP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const handlePublished = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/post/published/${post._id}`,
        {
          status: "published",
        },
        {
          headers: {
            Authorization: `Bearer ${token?.trim()}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success(response?.data?.msg)
        navigate("/admin/posts");
      }
    } catch (error) {
      console.log("Error updating post status:", error);
    }
  };
  return (
    <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6 my-8">
      {/* Title */}
      <h1 className="text-3xl font-extrabold mb-4">{post.title}</h1>

      {/* Content */}
      <article className="whitespace-pre-line mb-6 text-gray-800 leading-relaxed">
        {post.content}
      </article>

      {/* Footer: author, date, status/actions */}
      <div className="flex flex-wrap justify-between items-center gap-4">
        <div className="text-sm text-gray-600">
          लेखक: <span className="font-medium">{post.author}</span>
        </div>
        <div className="text-sm text-gray-600">
          मिति: <span className="font-medium">{formattedDate}</span>
        </div>
        <div className="flex items-center space-x-2">
          {/* Publish/Unpublish Toggle */}
          {post.status === "pending" ? (
            <>
              <button
                onClick={handlePublished}
                className={`px-4 py-2 rounded-full text-sm font-semibold focus:outline-none 
  ${
    post.status === "pending"
      ? "bg-green-500 text-white hover:bg-green-600"
      : ""
  }
`}
              >
                प्रकाशन गर्नुहोस्
              </button>
            </>
          ) : (
            <p className=" font-semibold text-gray-500 text-sm">
              प्रकाशित गरिएको
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewPostContent;
