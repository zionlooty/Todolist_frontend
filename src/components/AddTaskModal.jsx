import React, { useState } from "react";
import { toast } from "sonner";

const AddTaskModal = ({ isOpen, onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [due_date, setDueDate] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [category, setCategory] = useState("General");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
  
    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!due_date) {
      toast.error("Due date is required");
      return;
    }
  
    const newTask = {
      title: title.trim(),
      description: description.trim(),
      due_date,
      priority,
      category: category.trim() || "General",
      status: "pending",
    };
    console.log("🧩 Task data before sending:", newTask);
  
    try {
      setLoading(true);
      await onSave?.(newTask); // single API call via context
      // reset and close on success
      setTitle("");
      setDescription("");
      setDueDate("");
      setPriority("Medium");
      setCategory("General");
      onClose();
    } catch (err) {
     
      console.error("❌ Task creation error (modal):", err);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Add New Task</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              type="text"
              placeholder="Enter task title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              placeholder="Enter task details"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              rows="3"
            />
          </div>

          {/* Due Date & Priority */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium mb-1">Due Date</label>
              <input
                type="date"
                value={due_date}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
              >
                <option>Low</option>
                <option>Medium</option>
                <option>High</option>
              </select>
            </div>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium mb-1">Category</label>
            <input
              type="text"
              placeholder="Enter category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              {loading ? "Saving..." : "Save Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTaskModal;
