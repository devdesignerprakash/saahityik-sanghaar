import React from "react";
import { FaPenFancy, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import Footer from "../components/footer";

const Blog = () => {
  const publishedDate = "२०२५ जेष्ठ १५"; // You can also use new Date().toLocaleDateString() for dynamic

  return (
    <>
      <div className="flex justify-center px-4 py-8 bg-gray-100">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-2 text-gray-800">
            पागल
          </h1>

          {/* Published Date */}
          <p className="text-center text-sm text-gray-500 mb-4">
            प्रकाशित मिति: {publishedDate}
          </p>

          {/* Author Info */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <FaPenFancy className="text-red-600 text-xl" />
            <span className="text-lg font-medium text-gray-700">
              लक्ष्मीप्रसाद देवकोटा
            </span>
            <img
              src="https://www.lensnepal.com/files/profiles/laxmi-prasad-devkota.jpg"
              alt="Laxmi Prasad Devkota"
              className="w-12 h-12 rounded-full object-cover"
            />
          </div>

          {/* Poem Content */}
          <p className="text-gray-800 leading-8 whitespace-pre-wrap text-justify">
            {`जरुर साथी म पागल ! ...
यस्तै छ मेरो हाल !`} {/* truncated for brevity */}
          </p>
        </div>
      </div>

      {/* Comment and Share Section */}
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        {/* Comment Form */}
        <form className="flex flex-col gap-4 mb-6">
          <textarea
            placeholder="Add a comment..."
            className="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring focus:ring-blue-200 resize-none"
            rows="3"
          />
          <button
            type="submit"
            className="self-end bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-200"
          >
            Submit
          </button>
        </form>

        {/* Existing Comments */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Comments</h2>
          <div className="bg-gray-100 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <span className="font-semibold text-gray-800">username</span>
              <p className="text-gray-700">It's an awesome poem!</p>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <GrLike />
              <span>1</span>
            </div>
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
