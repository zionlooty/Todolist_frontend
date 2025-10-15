import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/axios";
import { toast } from "sonner";

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
        toast.success(" Login Successful");
        navigate("/");
      } else {
        // No token returned
        toast.error(" Login Failed: Incorrect email or password");
      }
    } catch (error) {
      const statusCode = error?.response?.status;
      const serverMessageRaw =
        error?.response?.data?.message ?? error?.response?.data?.error ?? "";
      const serverMessage = String(serverMessageRaw).toLowerCase();

      const isCredentialsIssue =
        statusCode === 400 ||
        statusCode === 401 ||
        statusCode === 403 ||
        statusCode === 404 ||
        serverMessage.includes("invalid credentials") ||
        serverMessage.includes("invalid email or password") ||
        (serverMessage.includes("incorrect") &&
          (serverMessage.includes("password") || serverMessage.includes("email"))) ||
        serverMessage.includes("user not found");

      if (isCredentialsIssue) {
        toast.error(" Incorrect email or password");
      } else if (serverMessage) {
        toast.error(serverMessageRaw);
      } else if (!error?.response) {
        toast.error(" Network error, please try again");
      } else {
        toast.error(" Something went wrong, please try again");
      }
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white border border-gray-200 rounded-2xl p-8 w-full max-w-md shadow-lg">
        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 bg-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center text-white font-bold text-lg">
            ✓
          </div>
          <h1 className="text-2xl font-bold text-gray-800">Welcome back</h1>
          <p className="text-gray-500 text-sm">
            Login to continue managing your tasks
          </p>
        </div>

        {/* Form */}
        <form className="flex flex-col gap-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full text-white bg-blue-600 hover:bg-blue-800 cursor-pointer py-2 rounded-md"
          >
            {loading ? "Logging in..." : "Log in"}
          </button>
        </form>

        {/* OR Divider */}
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <span className="px-2 text-gray-500 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>

        <p className="text-sm text-center text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500">
            signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Loginpage;
