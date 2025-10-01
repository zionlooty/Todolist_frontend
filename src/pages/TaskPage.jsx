import React, { useEffect, useState } from "react";
import API from "../api/axios";
import { toast } from "sonner";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";

const TaskPage = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API.get("/task");
      setTasks(res.data.tasks);
    } catch {
      toast.error("Failed to fetch tasks");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleUpdateTask = async (updatedTask) => {
    try {
      await API.put(`/task/${updatedTask.task_id}`, updatedTask);
      toast.success("Task updated successfully");
      fetchTasks();
    } catch {
      toast.error("Failed to update task");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      await API.delete(`/task/${taskId}`);
      toast.success("Task deleted successfully");
      fetchTasks();
      setDeletingTask(null);
    } catch {
      toast.error("Failed to delete task");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
        >
          + Add Task
        </button>
      </div>

      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg shadow-sm">
            <thead>
              <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-600">
                <th className="p-3 border">#</th>
                <th className="p-3 border">Title</th>
                <th className="p-3 border">Description</th>
                <th className="p-3 border">Priority</th>
                <th className="p-3 border">Status</th>
                <th className="p-3 border">Due Date</th>
                <th className="p-3 border text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task, i) => (
                <tr key={task.task_id} className="hover:bg-gray-50">
                  <td className="p-3 border">{i + 1}</td>
                  <td className="p-3 border font-medium">{task.title}</td>
                  <td className="p-3 border">{task.description}</td>
                  <td className="p-3 border capitalize">{task.priority}</td>
                  <td
                    className={`p-3 border ${
                      task.status === "completed" ? "text-green-600" : "text-yellow-600"
                    }`}
                  >
                    {task.status}
                  </td>
                  <td className="p-3 border">
                    {task.due_date ? new Date(task.due_date).toLocaleDateString() : "—"}
                  </td>
                  <td className="p-3 border text-center space-x-2">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeletingTask(task)}
                      className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddTaskModal
          isOpen
          onClose={() => setShowAddModal(false)}
          onSave={fetchTasks}
        />
      )}

      {editingTask && (
        <EditTaskModal
          isOpen
          task={editingTask}
          onClose={() => setEditingTask(null)}
          onSave={handleUpdateTask}
        />
      )}

      {deletingTask && (
        <DeleteTaskModal
          isOpen
          onClose={() => setDeletingTask(null)}
          onConfirm={() => handleDeleteTask(deletingTask.task_id)}
        />
      )}
    </div>
  );
};

export default TaskPage;
