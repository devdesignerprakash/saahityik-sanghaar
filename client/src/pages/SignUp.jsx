import React from 'react';
import Nepali from 'nepalify-react';

const SignUp = () => {
  
  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow-xl rounded-xl">
      <div className="bg-white w-full h-full p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">प्रयोगकर्ता दर्ता फारम</h1>

        <form className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="flex flex-col w-full md:w-1/2 gap-4">
            {/* Full Name (Nepali) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                तपाईँको पुरा नाम <span className="text-red-500">*</span>
              </label>
              <Nepali
                funcname="unicodify"
                type="text"
                placeholder="पुरा नाम"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address (Nepali) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                ठेगाना <span className="text-red-500">*</span>
              </label>
              <Nepali
                funcname="unicodify"
                type="text"
                placeholder="ठेगाना"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Email (Standard) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                इ-मेल ठेगाना<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                placeholder="john@doe"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col w-full md:w-1/2 gap-4">
            {/* Gender */}
            <div>
              <label className="block mb-1 text-sm font-medium">लिङ्ग<span className="text-red-500">*</span></label>
              <select
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">लिङ्ग चयन गर्नुहोस्</option>
                <option value="male">पुरुष</option>
                <option value="female">महिला</option>
                <option value="other">अन्य</option>
              </select>
            </div>

            {/* Username (Standard) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                प्रयोगकर्ता नाम <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="Username"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Password (Standard) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                पासवर्ड <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                placeholder="Password"
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </form>

        {/* Submit Button */}
        <div className="mt-6 text-center">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            पेश गर्नुहोस्
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
