import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios'
import AuthContext from '../../context/AuthContext'
import { FaPenFancy } from 'react-icons/fa'

const ShowALLPosts = () => {
  const [allPost, setAllPost] = useState([])
  const [expandedPosts, setExpandedPosts] = useState([])
  const { token } = useContext(AuthContext)

  useEffect(() => {
    const fetchAllPosts = async () => {
      const response = await axios.get("http://localhost:8000/api/post/getPosts", {
        headers: {
          Authorization: `Bearer ${token}`
        },
        withCredentials: true
      })
      setAllPost(response?.data)
      setExpandedPosts(new Array(response?.data.length).fill(false)) // init all as collapsed
    }
    fetchAllPosts()
  }, [])

  const toggleReadMore = (index) => {
    const updated = [...expandedPosts]
    updated[index] = !updated[index]
    setExpandedPosts(updated)
  }

  const getShortContent = (text) => {
    const words = text.split(" ")
    return words.slice(0, 150).join(" ") + "..."
  }

  return (
    <div className="p-4 space-y-6">
      {allPost.length > 0 ? (
        allPost.map((item, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 max-w-3xl mx-auto border border-gray-200"
          >
            <h2 className="text-xl font-semibold text-center text-gray-800 mb-1">
              {item.title}
            </h2>

            <p className="text-center text-sm text-gray-500 mb-2">
              प्रकाशित मिति: {new Date(item.createdAt).toLocaleDateString()}
            </p>

            <div className="flex items-center justify-center gap-3 mb-3">
              <FaPenFancy className="text-red-600 text-base" />
              <span className="text-gray-700 font-medium">{item.author}</span>
              <img
                src="https://www.lensnepal.com/files/profiles/laxmi-prasad-devkota.jpg"
                alt="Author"
                className="w-8 h-8 rounded-full object-cover"
              />
            </div>

            <p className="text-gray-700 leading-6 whitespace-pre-wrap text-justify mb-3">
              {expandedPosts[index]
                ? item.content
                : getShortContent(item.content)}
            </p>

            {item.content.split(" ").length > 150 && (
              <button
                className="text-blue-600 text-sm underline"
                onClick={() => toggleReadMore(index)}
              >
                {expandedPosts[index] ? "कम देखाउनुहोस्" : "थप पढ्नुभयो"}
              </button>
            )}

            <div className="flex justify-end gap-2 mt-3">
              <button className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-md">
                Published
              </button>
              <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md">
                Edit
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-md">
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">No Data Found</div>
      )}
    </div>
  )
}

export default ShowALLPosts
