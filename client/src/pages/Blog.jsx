import React, { useEffect, useState } from "react";
import { FaPenFancy, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import Footer from "../components/footer";
import { useLocation, useNavigate } from "react-router-dom";
import NepaliDate from 'nepali-date'
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { toast } from 'react-toastify'
import axios from 'axios'
import { socket } from "../utils/socket";
const Blog = () => {
  const { token } = useContext(AuthContext)
  const [comment, setComment] = useState({
    text: ""
  })
  const navigate = useNavigate()
  const location = useLocation()
  const { postData } = location.state || {}
  const [postDetails, setPostDetails] = useState(null)
  useEffect(() => {
  if (postData) {
    const fetchPost=async()=>{
      try{
        const response= await axios.get(`http://localhost:8000/api/post/getPost/${postData._id}`,{withCredentials:true})
        setPostDetails(response?.data)
      }catch(error){
        console.log(error)
      }
    }
    fetchPost()
    // Join post room
    socket.emit('joinPostRoom', postData._id)

    // Listen for new comment
    socket.on('newComment', ({ postId, comment }) => {
      if (postId === postData._id) {
        setPostDetails(prev =>({
          
          ...prev,
          comments: [...(prev?.comments || []), comment]
        }))
      }
      console.log(postDetails)
    })
  }
  return () => {
    socket.off('newComment')
  }
}, [])

  const dateConverter = (dateString) => {
    try {
      const adDate = new Date(dateString);
      const nepaliDate = new NepaliDate(adDate);
      return nepaliDate.format('yyyy mmmm  d'); // use capital YYYY and MMMM
    } catch (error) {
      console.error("Date conversion error:", error);
      return "मिति उपलब्ध छैन";
    }
  };
  const handleFocus = (e) => {
    if (!token) {
      toast.info("कृपया लगईन गर्नुहोस")
      navigate("/login")
    }
  }
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setComment((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  const handleComment = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.patch(`http://localhost:8000/api/post/comment/${postData._id}`, { comment }, {
        headers: {
          Authorization: `Bearer ${token.trim()}`
        },
      },
        { withCreditals: true }
      )
      if (response.status == 200) {
        toast.success('तपाईँले सफलतापुर्वक प्रतिकृया जनाउनुभयो')
        setComment({
          text: ""
        })
      }
    } catch (error) {
      console.log(error)
    }
  }
  //reactions
// const reactions = [
//   { id: "happy", emoji: "😄", label: "खुसी", percent: 50 },
//   { id: "sad", emoji: "😢", label: "दुखी", percent: 0 },
//   { id: "confused", emoji: "🤔", label: "अविभिक्त", percent: 0 },
//   { id: "excited", emoji: "🤩", label: "उत्साहित", percent: 0 },
//   { id: "angry", emoji: "😠", label: "आक्रोशित", percent: 50 },
// ];
  return (
    <>
      <div className="flex justify-center px-4 py-8 bg-gray-100">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
            {postDetails?.title}
          </h1>

          {/* Published Date */}
          <p className="text-center text-sm text-gray-500 mb-4">
            प्रकाशित मिति: {dateConverter(postDetails?.publishedAt)}
          </p>

          {/* Author Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <FaPenFancy className="text-red-600 text-xl" />
            <span className="text-lg font-medium text-gray-700">
              {postDetails?.author}
            </span>
            <img
              src={postDetails?.imageUrl}
              alt="Laxmi Prasad Devkota"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          {/* Poem Content */}
          <p className="text-gray-800 leading-8 whitespace-pre-wrap text-justify">
            {postDetails?.content}
          </p>
        </div>
      </div>

      {/* Comment and Share Section */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        {/* Comment Form */}
        <form className="flex flex-col gap-4 mb-6" onSubmit={handleComment}>
          <textarea
            placeholder="Add a comment..."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200 resize-none"
            onFocus={handleFocus}
            onChange={handleInputChange}
            name="text"
            value={comment.text}
            rows="3"
          />
          <button
            type="submit"
            className="self-end bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>

        {/* reaction sections */}
        {/* <div className="bg-white shadow-sm rounded-lg p-6 mt-8 max-w-3xl mx-auto">
  <h3 className="text-lg font-semibold text-center mb-6 text-gray-700">
    यो कविता पढेर तपाईंलाई कस्तो महसुस भयो?
  </h3>
  
  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 justify-items-center">
    {reactions.map((reaction) => (
      <div
        key={reaction.id}
        className="flex flex-col items-center justify-center gap-2 w-full text-center"
      >
        <div className="text-3xl">{reaction.emoji}</div>
        <div className="text-sm font-medium text-gray-600">{reaction.label}</div>
        <div className="relative w-full h-2 bg-gray-200 rounded-full">
          <div
            className="absolute top-0 left-0 h-2 bg-blue-500 rounded-full"
            style={{ width: `${reaction.percent}%` }}
          />
        </div>
        <span className="text-xs text-gray-500">{reaction.percent}%</span>
      </div>
    ))}
  </div>
</div> */}

        {/* Existing Comments */}
        <div className="mb-8 max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6 border-b border-gray-300 pb-2">
            <h2 className="text-2xl font-bold text-gray-900">
              टिप्पणीहरू <span className="text-blue-600">({postDetails?.comments?.length ?? 0})</span>
            </h2>
            <span className="text-sm text-gray-500">
              सबै कमेन्टहरू यहाँ देखिन्छन्
            </span>
          </div>

          <div className="flex flex-col gap-6">
            {postDetails?.comments?.length > 0 ? (
              postDetails.comments.map((comment) => (
                <div
                  key={comment._id}
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
                >
                  <div>
                    <span className="font-semibold text-gray-900">
                      {comment.user?.fullName || "Anonymous"}
                    </span>
                    <p className="text-gray-700 mt-1 whitespace-pre-wrap">{comment.text}</p>
                    <small className="text-gray-400 mt-1 block">
                      {new Date(comment.createdAt).toLocaleDateString("ne-NP", {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      })}
                    </small>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <GrLike className="text-lg" />
                    <span>{comment.likesCount ?? 0}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">अहिले सम्म कुनै कमेन्ट छैन।</p>
            )}
          </div>
        </div>

        {/* Share Section */}
        <div>
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Share this poem
          </h3>
          <div className="flex gap-4 text-2xl text-white">
            <a
              href="https://www.facebook.com/sharer/sharer.php?u=https://yourdomain.com/blog/pagal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 p-2 rounded-full hover:opacity-80"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com/intent/tweet?url=https://yourdomain.com/blog/pagal&text=Checkout%20this%20beautiful%20poem!"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-400 p-2 rounded-full hover:opacity-80"
            >
              <FaTwitter />
            </a>
            <a
              href="https://api.whatsapp.com/send?text=https://yourdomain.com/blog/pagal"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 p-2 rounded-full hover:opacity-80"
            >
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
