import React from "react"

const DeleteTaskModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null

  return (
    <>
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-sm text-center">
        <h2 className="text-lg font-bold mb-4">Delete Task</h2>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this task?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
          >
            No
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 text-white hover:bg-red-600"
          >
            Yes, Delete
          </button>
        </div>
      </div>
    </div>
    </>
  )
}

export default DeleteTaskModal
