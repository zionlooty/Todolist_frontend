import axios from "axios";

// ✅ Use environment variable for flexibility
const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000", // fallback for local dev
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Automatically attach token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
