import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import Nepalify from "nepalify";
import {toast} from "react-toastify";

const CreatePost = ({ onClose, post }) => {
  const { token } = useContext(AuthContext);

  const [postTypes, setPostTypes] = useState([]);
  const [frontendImage, setFrontendImage] = useState(null);

  const [postContent, setPostContent] = useState({
    title: "",
    author: "",
    content: "",
    imageUrl: null,
    postType: "",
  });

  // Fetch post types on mount
  useEffect(() => {
    const fetchPostTypes = async () => {
      try {
        const { data } = await axios.get("http://localhost:8000/api/postType/getAllPostTypes", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPostTypes(data);
      } catch (error) {
        console.error("Error fetching post types:", error.response?.data || error.message);
      }
    };

    fetchPostTypes();
  }, [token]);

  // Handle input changes for Nepali-formatted fields
  const handleNepaliInputChange = (e) => {
    const { name, value } = e.target;
    setPostContent((prev) => ({
      ...prev,
      [name]: Nepalify.format(value),
    }));
  };

  // Handle other input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle image file selection
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFrontendImage(URL.createObjectURL(file));
      setPostContent((prev) => ({
        ...prev,
        imageUrl: file,
      }));
    }
  };
const formData = new FormData();
formData.append("title", postContent.title);
formData.append("author", postContent.author);      
formData.append("content", postContent.content);
formData.append("imageUrl", postContent.imageUrl);  
formData.append("postType", postContent.postType);

  // Placeholder submit handler
  const handleSubmit = async(e) => {
    e.preventDefault();
   try{
    const response = await axios.post(
      "http://localhost:8000/api/post/create-post",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      },{withCredentials: true}     
    );
    if (response.status === 201) {
      toast.success(response.data.msg || "तपाईँको साहित्य सिर्जना भयो । कृपया प्रकाशित हुनको लागि प्रतिक्षा गर्नुहोस");
      onClose(!post);
    }
      
   }catch(error){
      toast.error("Error submitting post:", error.response?.data || error.message);}
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black opacity-30 z-40" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div className="relative w-full max-w-lg bg-white p-6 rounded-lg shadow-lg overflow-auto max-h-[90vh]">
          {/* Close Button */}
          <button
            onClick={() => onClose(!post)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              />
            </svg>
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">साहित्य सिर्जना गर्नुहोस्</h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={postContent.title}
              onChange={handleNepaliInputChange}
              placeholder="शीर्षक"
              className="block w-full mb-4 p-3 border border-gray-300 rounded"
              required
            />

            <input
              type="text"
              name="author"
              value={postContent.author}
              onChange={handleNepaliInputChange}
              placeholder="लेखकको नाम"
              className="block w-full mb-4 p-3 border border-gray-300 rounded"
              required
            />

            <textarea
              name="content"
              value={postContent.content}
              onChange={handleNepaliInputChange}
              placeholder="सामग्री लेख्नुहोस्..."
              className="block w-full mb-4 p-3 border border-gray-300 rounded h-32 resize-none"
              required
            />

            <input
              type="file"
              onChange={handleImageChange}
              name="imageUrl"
              className="block w-full mb-4 border border-gray-300 rounded p-2"
              accept="image/*"
            />

            {frontendImage && (
              <img src={frontendImage} alt="Preview" className="mb-4 max-h-40 object-contain rounded" />
            )}

            <select
              name="postType"
              value={postContent.postType}
              onChange={handleInputChange}
              className="block w-full mb-6 border border-gray-300 rounded p-3"
              required
            >
              <option value="">पोस्टको प्रकार चयन गर्नुहोस्</option>
              {postTypes.map(({ _id, labelName, postType }) => (
                <option key={_id} value={postType}>
                  {labelName}
                </option>
              ))}
            </select>

            <button type="submit" className="w-full bg-blue-700 text-white text-lg py-3 rounded hover:bg-blue-800">
              सिर्जना गर्नुहोस्
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
