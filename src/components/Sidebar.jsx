import React from "react";
import { FaHome, FaTasks, FaClock, FaRegCalendarAlt, FaCheckCircle } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const linkClasses = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-2 rounded-md transition-all ${
      isActive
        ? "bg-gray-900 text-white"
        : "text-gray-300 hover:bg-gray-800 hover:text-white"
    }`;

  return (
    <aside className="w-64 bg-gray-900 text-white flex flex-col h-full fixed md:relative z-30">
      <div className="p-4 text-2xl font-bold border-b border-gray-700">ToDoList</div>

      <nav className="flex-1 p-4 space-y-2">
        <NavLink to="/" className={linkClasses}>
          <FaHome /> Dashboard
        </NavLink>

        <NavLink to="/tasks" className={linkClasses}>
          <FaTasks /> All Tasks
        </NavLink>

        <NavLink to="/today" className={linkClasses}>
          <FaClock /> Today
        </NavLink>

        <NavLink to="/upcoming" className={linkClasses}>
          <FaRegCalendarAlt /> Upcoming
        </NavLink>

        <NavLink to="/completed" className={linkClasses}>
          <FaCheckCircle /> Completed
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
