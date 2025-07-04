import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext';
import { FaPenFancy, FaTrash, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import Nepali from 'nepalify';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

const ShowAllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/api/post/getPosts', {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        setPosts(response?.data || []);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError('पोस्टहरू लोड गर्न असफल भयो');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, [token]);

  const handleEdit = (postId) => {
    navigate(`/posts/edit/${postId}`);
  };

  const handleView = (postId) => {
    navigate(`/posts/${postId}`);
  };

  const handleDelete = (postId) => {
    confirmAlert({
      title: 'पोस्ट मेटाउन निश्चित हुनुहुन्छ?',
      message: 'तपाईंले यो पोस्ट मेटाउन चाहनुहुन्छ? यो कार्य पछि फिर्ता गर्न सकिँदैन।',
      buttons: [
        {
          label: 'हो',
          onClick: async () => {
            try {
              await axios.delete(`http://localhost:8000/api/post/deletePost/${postId}`, {
                headers: { Authorization: `Bearer ${token}` },
                withCredentials: true,
              });
              setPosts(posts.filter(post => post._id !== postId));
            } catch (error) {
              console.error("Error deleting post:", error);
              setError('पोस्ट मेटाउन असफल भयो');
            }
          }
        },
        {
          label: 'होईन',
          onClick: () => {}
        }
      ],
      closeOnEscape: true,
      closeOnClickOutside: true,
    });
  };

  const getShortContent = (text, wordCount = 20) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordCount ? words.slice(0, wordCount).join(' ') + '...' : text;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'मिति उपलब्ध छैन';
    return new Date(dateString).toLocaleDateString('ne-NP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getStatusBadge = (status) => {
    const statusMap = {
      published: { color: 'bg-green-100 text-green-700', icon: <FaCheck className="inline mr-1" /> },
      pending: { color: 'bg-yellow-100 text-yellow-800', icon: <FaPenFancy className="inline mr-1" /> },
      rejected: { color: 'bg-red-100 text-red-700', icon: <FaTimes className="inline mr-1" /> },
    };

    const statusConfig = statusMap[status?.toLowerCase()] || { color: 'bg-gray-100 text-gray-700', icon: null };

    return (
      <span className={`px-3 py-1 rounded-full text-sm ${statusConfig.color}`}>
        {statusConfig.icon}
        {status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-white rounded-xl shadow-md">
        <div className="text-red-500 text-center p-4">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md">
      <div className="flex justify-center items-center mb-6">
        <h1 className="text-2xl font-bold text-center">📚 पोस्ट तालिका</h1>
      </div>
      {posts.length === 0 ? (
        <div className="text-center p-8">
          <p className="text-gray-500 text-lg">कुनै पोस्ट फेला परेन।</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">क्र‍.स‌ं</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">शीर्षक</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">लेखक</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">सामग्री</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">मिति</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">स्थिति</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post, index) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{Nepali.format(index + 1)}</td>
                  <td className="px-6 py-4 whitespace-nowrap font-medium">{post.title || 'शीर्षक उपलब्ध छैन'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.author || 'अज्ञात'}</td>
                  <td className="px-6 py-4 max-w-xs">
                    <div className="text-gray-600 truncate">{getShortContent(post.content)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(post.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(post.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleView(post._id)}
                        className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-50"
                        title="हेर्नुहोस्"
                      >
                        <FaEye />
                      </button>
                      <button
                        onClick={() => handleEdit(post._id)}
                        className="text-green-600 hover:text-green-800 p-1 rounded-full hover:bg-green-50"
                        title="सम्पादन गर्नुहोस्"
                      >
                        <FaPenFancy />
                      </button>
                      <button
                        onClick={() => handleDelete(post._id)}
                        className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-50"
                        title="मेटाउनुहोस्"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ShowAllPosts;