import React, { useContext, useState } from "react";
import { FaGoogle, FaTwitter, FaFacebook } from "react-icons/fa";
import AuthContext from "../context/AuthContext";
import http from "../utils/http";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [credentials, setCredentials] = useState({
    userName: "",
    email: "",
    password: ""
  });

  const [rememberMe, setRememberMe] = useState(false);
  const { login } = useContext(AuthContext);

  const handleUserOrEmailChange = (e) => {
    const value = e.target.value;
    const isEmail = value.includes("@");

    setCredentials(prev => ({
      ...prev,
      email: isEmail ? value : "",
      userName: isEmail ? "" : value
    }));
  };

  const handlePasswordChange = (e) => {
    setCredentials(prev => ({
      ...prev,
      password: e.target.value
    }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await http.post(
        "/api/user/login",
        credentials
      );

      if (response.status === 200) {
        const { token } = response.data.data;
        login(token, rememberMe);
        setCredentials({ userName: "", email: "", password: "" });
        toast.success(response.data.msg || "Login successful");
        
        // Don't redirect here - let AuthContext handle it after user is fetched
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg || "Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-white shadow-xl rounded-xl flex flex-col md:flex-row w-full max-w-6xl relative">

        {/* Logo Circle */}
        <div className="absolute -top-0.25 left-1/2 md:left-1/5 transform -translate-x-1/2 md:translate-x-0 z-10">
          <div className="w-28 h-28 md:w-36 md:h-36 rounded-full bg-white border-4 border-blue-100 shadow-lg flex flex-col items-center justify-center text-center px-2">
            <div className="text-lg md:text-xl font-bold leading-tight">
              <div className="text-red-600">साहित्यिक</div>
              <div className="text-blue-600">सङ्घार</div>
            </div>
          </div>
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-6 pt-32 md:pt-40 bg-blue-50">
          <div className="text-center mb-6">
            <p className="text-sm text-gray-500 mb-3">Use Social Media</p>
            <div className="flex justify-center gap-4 flex-wrap">
              <button className="w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center text-red-600 hover:bg-red-50 text-lg">
                <FaGoogle />
              </button>
              <button className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 text-lg">
                <FaFacebook />
              </button>
              <button className="w-12 h-12 rounded-full bg-sky-400 flex items-center justify-center text-white hover:bg-sky-500 text-lg">
                <FaTwitter />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="text-gray-500 text-sm">or</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Username or Email"
              className="border border-gray-300 rounded-md p-3"
              value={credentials.email || credentials.userName}
              onChange={handleUserOrEmailChange}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="border border-gray-300 rounded-md p-3"
              name="password"
              value={credentials.password}
              onChange={handlePasswordChange}
              required
            />
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between text-sm text-gray-600 gap-2 sm:gap-0">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-blue-600 focus:ring-blue-500 rounded-md"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <a href="#" className="text-blue-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            >
              Login
            </button>
            <p className="text-sm text-center text-gray-700">
              Not have account yet?{" "}
              <Link to="/signup" className="text-blue-600 hover:underline">
                Signup Now
              </Link>
            </p>
          </form>
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-6 bg-white text-gray-800">
          <h3 className="text-lg md:text-xl font-semibold mb-4 text-blue-700">
            कृपया ध्यान दिनुहोस्:
          </h3>
          <ol className="list-decimal pl-4 space-y-3 text-sm leading-relaxed">
            <li className="text-[12px] text-gray-400 md:text-lg">
              तपाईंले कमेन्ट गर्नका लागि अनिवार्य रजिस्ट्रेशन गर्नु पर्नेछ।
            </li>
            <li className="text-[12px] text-gray-400 md:text-lg">
              तपाईं आफ्नो इमेल वा गूगल, फेसबुक र ट्विटरमार्फत पनि सजिलै लगइन गर्न सक्नुहुन्छ।
            </li>
            <li className="text-[12px] text-gray-400 md:text-lg">
              रजिस्ट्रेशन गरेपछि प्रोफाइलमार्फत तपाईंले गरेका कमेन्ट, रिप्लाइ,
              लाइक/डिसलाइकको सम्पूर्ण विवरण हेर्न सकिन्छ।
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
};

export default Login;
