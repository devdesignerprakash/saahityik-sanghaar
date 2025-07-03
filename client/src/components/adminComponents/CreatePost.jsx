import React from 'react';

const CreatePost = () => {
  return (
    <>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black opacity-40 z-40" />

      {/* Modal Wrapper */}
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        {/* Modal Box */}
        <div className="w-[600px] h-[500px] bg-white p-6 rounded shadow-lg overflow-auto">
          <form>
            <input
              type="text"
              placeholder="Title"
              className="block w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <input
              type="text"
              placeholder="Author"
              className="block w-full mb-3 p-2 border border-gray-300 rounded"
            />
            <textarea
              placeholder="Content"
              className="block w-full mb-3 p-2 border border-gray-300 rounded"
            ></textarea>
            <input type="file" className="block w-full mb-4" />
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              Add
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
