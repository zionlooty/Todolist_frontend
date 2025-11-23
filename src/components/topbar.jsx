import React from "react";
import { FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Topbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  let userName = "User";

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userName = decoded.fullname || "User";
    } catch (err) {
      console.error("Error decoding token:", err);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      <header className="w-full bg-white border-b border-gray-200 shadow-sm 
                         px-4 sm:px-6 md:px-10 py-4 flex items-center justify-between">

        <h2 className="text-base sm:text-lg md:text-xl font-semibold">
          Welcome back, {userName} 👋
        </h2>

        <div className="flex items-center gap-3 sm:gap-4">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 sm:px-4 py-2 
                       bg-red-600 text-white rounded-lg hover:bg-red-700 
                       text-sm sm:text-base"
          >
            <FiLogOut />
            Logout
          </button>
        </div>
      </header>
    </>
  );
};

export default Topbar;
