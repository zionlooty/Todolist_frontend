import React from 'react'
import { FaCheckCircle, FaRegCircle } from 'react-icons/fa'

const Taskitem = ({ title, status, dueDate, description }) => {
    return (
        <>
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                        {status === "completed" ? (
                            <FaCheckCircle className="text-green-500 text-2xl" />
                        ) : (
                            <FaRegCircle className="text-gray-400 text-2xl" />
                        )}
                        <h4 className="text-lg font-semibold">{title}</h4>
                    </div>
                    <span
                        className={`px-4 py-1 text-sm font-medium rounded-full ${status === "completed"
                                ? "bg-green-100 text-green-700"
                                : "bg-yellow-100 text-yellow-700"
                            }`}
                    >
                        {status}
                    </span>
                </div>

               
                {description && (
                    <p className="text-gray-600 mb-3">{description}</p>
                )}

               
                <p className="text-sm text-gray-500">📅 Due: {dueDate}</p>
            </div>
        </>
    )
}

export default Taskitem