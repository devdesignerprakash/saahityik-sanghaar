import React from 'react';

const NewsLetter = () => {
  return (
    <section className="bg-blue-50 py-12 px-4 mt-16">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          साहित्यिक समाचार प्राप्त गर्न चाहनुहुन्छ?
        </h2>
        <p className="text-gray-600 mb-6">
          नयाँ पोस्टहरू, कविताहरू, उपन्यास र विश्लेषणहरू तपाईंको इनबक्समा प्राप्त गर्नुहोस्।
        </p>

        <form className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <input
            type="email"
            placeholder="तपाईंको इमेल ठेगाना"
            className="w-full sm:w-auto px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            सदस्य बन्नुहोस्
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
