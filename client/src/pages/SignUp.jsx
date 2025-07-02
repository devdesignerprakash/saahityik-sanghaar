import React, { useState } from 'react';
import axios from 'axios'
import {toast} from 'react-toastify';
import nepalify from "nepalify";

const SignUp = () => {
  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    gender: "",
    userName: "",
    password: ""

  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserDetails(prev => ({
      ...prev,
      [name]: value
    }));
  }

  //handle fullName and address in Nepali
  const handleNepaliInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails(prev => ({
      ...prev,          
      [name]: nepalify.format(value) // Convert to Nepali script
    }));
  }
  const handleSubmit = async (e) => {
    console.log("on handle Clicked")
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/user/signup', userDetails, { withCredentials: true })
      if (response.status == 201) {
        setUserDetails(
          {
            fullName: "",
            email: "",
            address: "",
            gender: "",
            userName: "",
            password: ""

          }
        )
      }
      if(response.status === 201){
        toast.success(response?.data?.msg || "User registered successfully");
      }

    } catch (error) {
     if (error.response && error.response.status === 400) {
        toast.error(error.response.data.msg || "User registration failed. Please check your details.")
      }
      else{
        toast.error("An unexpected error occurred. Please try again later.");
      }

  } 
}

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-gray-100 shadow-xl rounded-xl">
      <div className="bg-white w-full h-full p-8 rounded-lg">
        <h1 className="text-3xl font-bold text-center mb-6">प्रयोगकर्ता दर्ता फारम</h1>
        
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
           <div className="flex flex-col md:flex-row gap-6">
          {/* Left Column */}
          <div className="flex flex-col w-full md:w-1/2 gap-4">
            {/* Full Name (Nepali) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                तपाईँको पुरा नाम <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                placeholder="पुरा नाम"
                name="fullName"
                value={userDetails.fullName}
                onChange={(e) => handleNepaliInputChange(e)}
                required
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Address (Nepali) */}
            <div>
              <label className="block mb-1 text-sm font-medium">
                ठेगाना <span className="text-red-500">*</span>
              </label>
              <input
                name="address"
                value={userDetails.address}
                onChange={(e) => handleNepaliInputChange(e)}
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
                name="email"
                value={userDetails.email}
                onChange={handleInputChange}
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
                name='gender'
                value={userDetails.gender}
                onChange={handleInputChange}
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
                name="userName"
                onChange={handleInputChange}
                value={userDetails.userName}
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
                name="password"
                value={userDetails.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          </div>
          <div className="mt-1 text-center ">
            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition cursor-pointer"
            >
              पेश गर्नुहोस्
            </button>
          </div>
        </form>

        {/* Submit Button */}

      </div>
    </div>
  );
};

export default SignUp;
