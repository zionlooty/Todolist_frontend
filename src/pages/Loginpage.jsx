import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "sonner";
import { FaEye, FaEyeSlash, FaEnvelope } from "react-icons/fa";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/user/login", { email, password });
      const { token } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        toast.success("Login successful");
        navigate("/");
      } else {
        toast.error("Incorrect email or password");
      }
    } catch (error) {
      const msg = error?.response?.data?.message?.toLowerCase() || "";

      if (
        msg.includes("invalid") ||
        msg.includes("incorrect") ||
        msg.includes("wrong") ||
        msg.includes("not found")
      ) {
        toast.error("Incorrect email or password");
      } else if (!error?.response) {
        toast.error("Network error, please try again");
      } else {
        toast.error("Something went wrong, please try again");
      }

      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-md shadow-lg">
        {/* HEADER */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-500 text-sm">
            Login to continue managing your tasks
          </p>
        </div>

        {/* FORM */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          {/* ✅ Email input with icon */}
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
              <FaEnvelope />
            </span>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* ✅ Password input with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 pr-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer text-gray-500 hover:text-blue-600"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          {/* ✅ Submit button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full text-white bg-blue-600 hover:bg-blue-700 transition py-3 rounded-lg font-semibold ${
              loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* DIVIDER */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        {/* SIGNUP LINK */}
        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
