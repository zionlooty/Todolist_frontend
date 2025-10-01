import React, { useState } from "react";
import { FiLogOut, FiPlus } from "react-icons/fi";
import AddTaskModal from "./AddTaskModal";
import { useNavigate } from "react-router-dom"; // for redirect
import {jwtDecode} from "jwt-decode"; // ✅ correct import

const Topbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token"); // remove token
    navigate("/login"); // redirect to login page
  };

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold">Welcome back, {userName} 👋</h2>
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <FiPlus /> Add Task
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            <FiLogOut /> Logout
          </button>
        </div>
      </header>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
};

export default Topbar;
