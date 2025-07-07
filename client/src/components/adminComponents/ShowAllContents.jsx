import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { FaPenFancy, FaTrash, FaEye, FaCheck, FaTimes } from 'react-icons/fa';
import Nepali from 'nepalify';

import AuthContext from '../../context/AuthContext';
import CreatePost from './CreatePost';

const ShowAllPosts = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isCreateOpen, setCreateOpen] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios.get(
          'http://localhost:8000/api/post/getPosts',
          {
            headers: { Authorization: `Bearer ${token?.trim()}` },
          }
        );
        setPosts(data || []);
      } catch (err) {
        console.error('Error fetching posts:', err.response || err.message);
        setError('पोस्टहरू लोड गर्न असफल भयो');
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchPosts();
  }, [token]);

  const handleEdit = (postId) => {
    navigate(`/admin/posts/edit/${postId}`);
  };

  const handleView = async (postId) => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/post/getPost/${postId}`,
        { headers: { Authorization: `Bearer ${token?.trim()}` } }
      );
      if (data) {
        navigate(`/admin/post/view/${postId}`, { state: { post: data } });
      }
    } catch (err) {
      console.error('Error fetching post:', err);
    }
  };

  const handleDelete = (postId) => {
    confirmAlert({
      title: 'पोस्ट मेटाउन निश्चित हुनुहुन्छ?',
      message: 'यो कार्य पछि फिर्ता गर्न सकिँदैन।',
      buttons: [
        {
          label: 'हो',
          onClick: async () => {
            try {
              await axios.delete(
                `http://localhost:8000/api/post/deletePost/${postId}`,
                { headers: { Authorization: `Bearer ${token?.trim()}` } }
              );
              setPosts((prev) => prev.filter((p) => p._id !== postId));
            } catch (err) {
              console.error('Error deleting post:', err);
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
      closeOnClickOutside: true
    });
  };

  const getShortContent = (text, wordCount = 20) => {
    if (!text) return '';
    const words = text.split(' ');
    return words.length > wordCount ? `${words.slice(0, wordCount).join(' ')}...` : text;
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
    const map = {
      published: { color: 'bg-green-100 text-green-700', icon: <FaCheck className="inline mr-1" /> },
      pending:   { color: 'bg-yellow-100 text-yellow-800', icon: <FaPenFancy className="inline mr-1" /> },
      rejected:  { color: 'bg-red-100 text-red-700', icon: <FaTimes className="inline mr-1" /> }
    };
    const cfg = map[status?.toLowerCase()] || { color: 'bg-gray-100 text-gray-700', icon: null };
    return (
      <span className={`px-3 py-1 rounded-full text-sm ${cfg.color}`}>
        {cfg.icon}{status}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
        <div className='flex justify-end mb-4'>
            <button
          className="bg-blue-500 justify-end text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={() => setCreateOpen(true)}
        >
          नयाँ पोस्ट सिर्जना गर्नुहोस्
        </button>
        </div>
      <div className="flex justify-center items-center mb-4">
        <h1 className="text-2xl font-bold">📚 पोस्ट तालिका</h1>
      </div>

      {posts.length === 0 ? (
        <p className="text-gray-500 text-center">कुनै पोस्ट फेला परेन।</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">क्र​.सं.</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">शीर्षक</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">लेखक</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">सामग्री</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">मिति</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">स्थिति</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">कार्रवाई</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {posts.map((post, idx) => (
                <tr key={post._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">{Nepali.format(idx + 1)}</td>
                  <td className="px-6 py-4 font-medium whitespace-nowrap">{post.title || 'शीर्षक उपलब्ध छैन'}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{post.author || 'अज्ञात'}</td>
                  <td className="px-6 py-4 max-w-xs"><div className="truncate text-gray-600">{getShortContent(post.content)}</div></td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(post.createdAt)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(post.status)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex space-x-2">
                      <button onClick={() => handleView(post._id)} className="p-1 rounded-full hover:bg-blue-50 text-blue-600" title="हेर्नुहोस्"><FaEye/></button>
                      <button onClick={() => handleEdit(post._id)} className="p-1 rounded-full hover:bg-green-50 text-green-600" title="सम्पादन गर्नुहोस्"><FaPenFancy/></button>
                      <button onClick={() => handleDelete(post._id)} className="p-1 rounded-full hover:bg-red-50 text-red-600" title="मेटाउनुहोस्"><FaTrash/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isCreateOpen && <CreatePost onClose={() => setCreateOpen(false)} />}
    </div>
  );
};

export default ShowAllPosts;
