import  { useEffect, useState, useContext, useRef } from "react";
import axios from "axios";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { convertToNepaliUnicode } from "../../utils/preetiToUnicode";
import { useLayoutEffect } from "react";


const EditPost = ({ onClose, post, openEdit }) => {
  const { token } = useContext(AuthContext);
  const [postTypes, setPostTypes] = useState([]);
  const [frontendImage, setFrontendImage] = useState(null);
  const [cursorPosition, setCursorPosition] = useState(null);
 

  const [postContent, setPostContent] = useState({
    title: "",
    author: "",
    content: "",
    imageUrl: null,
    postType: "",
  });
  //inputref  to fix cursor position
  const inputRef= useRef(null)
 
  
  // Fill form with existing post values on mount
  useEffect(() => {
    if (post) {
      setPostContent({
        title: post.title || "",
        author: post.author || "",
        content: post.content || "",
        imageUrl: post.imageUrl || null,
        postType: post.postType || "",
      });
      setFrontendImage(post?.imageUrl || null);
    }
  }, [post]);
useLayoutEffect(() => {
  if (inputRef.current && cursorPosition !== null) {
    inputRef.current.selectionStart = cursorPosition;
    inputRef.current.selectionEnd = cursorPosition;
  }
}, [cursorPosition]);
  

  // Fetch post types
  useEffect(() => {
    const fetchPostTypes = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/postType/getAllPostTypes",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setPostTypes(data);
      } catch (error) {
        console.error(
          "Error fetching post types:",
          error.response?.data || error.message
        );
      }
    };
    fetchPostTypes();
  }, [token]);

  const handleNepaliInputChange = (e) => {
    const { name, value } = e.target;
     const position = e.target.selectionStart;
    const convertedText=convertToNepaliUnicode(value)
    setPostContent((prev) => ({
      ...prev,
      [name]: convertedText
    }));
    setCursorPosition(position)
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPostContent((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", postContent.title);
    formData.append("author", postContent.author);
    formData.append("content", postContent.content);
    formData.append("postType", postContent.postType);
    if (postContent.imageUrl instanceof File) {
      formData.append("imageUrl", postContent.imageUrl);
    }

    try {
      const response = await axios.put(
        `http://localhost:8000/api/post/update-post/${post._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      if (response.status === 200) {
        toast.success("पोस्ट सफलतापूर्वक सम्पादन गरियो!");
        onClose(!openEdit);
      }
    } catch (error) {
      toast.error(
        "Error updating post: " +
          (error.response?.data?.message || error.message)
      );
    }
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
            onClick={() => onClose(!openEdit)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 focus:outline-none"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 24 24"
              className="w-6 h-6"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 11-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
              />
            </svg>
          </button>

          {/* Title */}
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            पोष्ट सम्पादन गर्नुहोस्
          </h2>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="title"
              value={postContent.title}
              onChange= {handleNepaliInputChange}
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
              ref={inputRef}
              required
            />

            <input
              type="file"
              onChange={handleImageChange}
              name="imageUrl"
              className="block w-full mb-4 border border-gray-300 rounded p-2"
              accept="image/*"
            />
            {frontendImage ? (
              // If a new image is selected
              <img
                src={
                  typeof frontendImage === "string"
                    ? frontendImage // already a URL (e.g., from setPreviewImage)
                    : URL.createObjectURL(frontendImage) // new file selected
                }
                alt="Preview"
                className="mb-4 max-h-40 object-contain rounded"
              />
            ) : post.imageUrl ? (
              // Show existing post image if no new image selected
              <img
                src={post.imageUrl}
                alt="Existing image"
                className="mb-4 max-h-40 object-contain rounded"
              />
            ) : null}

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

            <button
              type="submit"
              className="w-full bg-green-700 text-white text-lg py-3 rounded hover:bg-green-800"
            >
              अपडेट गर्नुहोस्
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditPost;

