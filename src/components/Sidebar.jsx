import React from 'react'
import { FaCheckCircle, FaClock, FaHome, FaRegCalendarAlt, FaTasks } from 'react-icons/fa'
import { Link } from 'react-router-dom'

const Sidebar = ({ onNavigate }) => {
    return (
        <>
            <aside className="w-64 bg-gray-900 text-white flex flex-col h-full">
                <div className="p-4 text-2xl font-bold border-b border-gray-700">
                    ToDoList
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    <Link to="/" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700">
                        <FaHome /> Dashboard
                    </Link>

                    <Link to="/tasks" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700">
                        <FaTasks /> All Tasks
                    </Link>

                    <Link to="/today" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700">
                        <FaClock /> Today
                    </Link>

                    <Link to="/upcoming" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700">
                        <FaRegCalendarAlt /> Upcoming
                    </Link>

                    <Link to="/completed" onClick={onNavigate} className="flex items-center gap-3 px-3 py-2 rounded hover:bg-gray-700">
                        <FaCheckCircle /> Completed
                    </Link>
                </nav>
            </aside>
        </>
    )
}

export default Sidebar