import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import axios from 'axios';
import { socket } from '../utils/socket';

const BlogList = ({ searchResults }) => {
  const { token } = useContext(AuthContext);
  const [selectedCategory, setSelectedCategory] = useState("सबै");
  const [literatureMenu, setLiteratureMenu] = useState([]);

  // Fetch published posts
  useEffect(() => {
    const fetchPublishedPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/post/getPublishedPost`, {
          withCredentials: true,
        });

        if (response?.data?.length > 0) {
          setLiteratureMenu(response.data);
        } else {
          setLiteratureMenu([]);
        }
      } catch (error) {
        console.error("Error fetching published posts:", error);
      }
    };

    fetchPublishedPost();
  }, [token]);

  // Listen to real-time published posts
  useEffect(() => {
    const handlePublished = (data) => {
      setLiteratureMenu((prev) => {
        const exists = prev.some(item => item.id === data.id);
        return exists ? prev : [...prev, data];
      });
    };

    socket.on('published', handlePublished);
    return () => socket.off('published', handlePublished);
  }, []);

  const categories = ["सबै", ...new Set(literatureMenu.map(item => item?.postType?.labelName))];

  const trimContent = (text) => {
    if (!text) return "";
    const words = text.split(" ");
    return words.slice(0, 40).join(" ") + (words.length > 40 ? "..." : "");
  };

  // Filter posts
  const baseData = searchResults?.length ? searchResults : literatureMenu;
  const filteredData = selectedCategory === "सबै"
    ? baseData
    : baseData.filter(item => item?.postType?.labelName === selectedCategory);

  return (
    <>
      {/* Category Buttons */}
      {!searchResults?.length && (
        <div className="flex justify-center flex-wrap gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full font-semibold transition
                ${selectedCategory === category ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-blue-100'}
              `}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {/* Post Cards */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {filteredData.map((item) => (
          <div
            key={item?._id || item?.title}
            className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={item?.imageUrl || '/placeholder.jpg'}
              alt={item?.title || 'Post image'}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col flex-grow">
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-xl font-bold truncate">{item?.title}</h2>
                <span className="text-sm bg-blue-100 text-blue-700 px-2 py-1 rounded-full whitespace-nowrap">
                  {item?.postType?.labelName}
                </span>
              </div>
              <h3 className="text-gray-700 mb-2">लेखक: {item?.author}</h3>
              <p className="text-gray-600 flex-grow">{trimContent(item?.content)}</p>
              <Link
                to={`/blog/${item?.title}`}
                className="mt-4 inline-block text-blue-600 hover:text-blue-800 font-semibold"
                state={{ postData: item }}
              >
                थप पढ्नुहोस् &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default BlogList;
