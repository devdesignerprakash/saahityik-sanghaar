import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { FaPenFancy } from 'react-icons/fa';

const ShowAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const { token } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/post/getPosts', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setPosts(response?.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, [token]);

  const getShortContent = (text) => {
    const words = text?.split(' ') || [];
    return words.length > 20 ? words.slice(0, 20).join(' ') + '...' : text;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ne-NP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'published':
        return 'bg-green-100 text-green-700';
      case 'draft':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="p-6 bg-white rounded-xl shadow-md overflow-x-auto">
      <h1 className="text-2xl font-bold text-center mb-6">📚 पोस्ट तालिका</h1>

      {posts.length === 0 ? (
        <p className="text-center text-gray-500 mt-10 text-lg">कुनै पोस्ट फेला परेन।</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">#</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">शीर्षक</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">लेखक</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">रचना मिति</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">स्थिति</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">सामग्री</th>
              <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">कार्यहरू</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {posts.map((post, index) => (
              <tr key={post._id || index} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2 text-sm text-gray-700">{index + 1}</td>
                <td className="px-4 py-2 text-sm font-medium text-gray-800 line-clamp-1">{post.title}</td>
                <td className="px-4 py-2 text-sm text-gray-700 flex items-center gap-1">
                  <FaPenFancy className="text-red-500" />
                  {post.author || 'अज्ञात'}
                </td>
                <td className="px-4 py-2 text-sm text-gray-600">{formatDate(post.createdAt)}</td>
                <td className="px-4 py-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(post.status)}`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-2 text-sm text-gray-700 line-clamp-2">
                  {getShortContent(post.content)}
                </td>
                <td className="px-4 py-2">
                  <div className="flex gap-2">
                    <button size="sm" variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">View</button>
                    <button size="sm" variant="outline" className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">Edit</button>
                    <button size="sm" variant="destructive">Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowAllPosts;
