import React, { useContext, useEffect, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import DeleteTaskModal from "../components/DeleteTaskModal";

const TaskPage = () => {
  const { tasks, loading, fetchTasks, addTask, updateTask, deleteTask } =
    useContext(TaskContext);

  const [showAddModal, setShowAddModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [deletingTask, setDeletingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAddTask = async (newTask) => {
    await addTask(newTask);
    setShowAddModal(false);
  };

  const handleUpdateTask = async (updatedTask) => {
    await updateTask(updatedTask);
    setEditingTask(null);
  };

  const handleDeleteTask = async (taskId) => {
    await deleteTask(taskId);
    setDeletingTask(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Tasks</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          + Add Task
        </button>
      </div>

      {/* Loading & Empty State */}
      {loading ? (
        <p>Loading tasks...</p>
      ) : tasks.length === 0 ? (
        <p>No tasks available</p>
      ) : (
        <>
          {/* Desktop View (Table) */}
          <div className="hidden md:block overflow-x-auto">
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
                  <tr key={task.task_id || i} className="hover:bg-gray-50">
                    <td className="p-3 border">{i + 1}</td>
                    <td className="p-3 border font-medium">{task.title}</td>
                    <td className="p-3 border">{task.description}</td>
                    <td className="p-3 border capitalize">{task.priority}</td>
                    <td
                      className={`p-3 border ${
                        task.status === "completed"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {task.status}
                    </td>
                    <td className="p-3 border">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : "—"}
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

          {/* Mobile View (Cards) */}
          <div className="md:hidden grid grid-cols-1 gap-4">
            {tasks.map((task, i) => (
              <div
                key={task.task_id || i}
                className="p-4 border rounded-lg shadow-sm bg-white"
              >
                <div className="flex justify-between items-start">
                  <h2 className="text-lg font-semibold">{task.title}</h2>
                  <span
                    className={`text-xs px-2 py-1 rounded ${
                      task.status === "completed"
                        ? "bg-green-100 text-green-700"
                        : "bg-yellow-100 text-yellow-700"
                    }`}
                  >
                    {task.status}
                  </span>
                </div>

                <p className="text-gray-600 mt-1 text-sm">
                  {task.description || "No description"}
                </p>

                <div className="flex justify-between items-center mt-3 text-sm text-gray-500">
                  <p>
                    📅{" "}
                    {task.due_date
                      ? new Date(task.due_date).toLocaleDateString()
                      : "No date"}
                  </p>
                  <p>⭐ {task.priority || "Normal"}</p>
                </div>

                <div className="flex justify-end gap-2 mt-3">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="px-3 py-1 bg-yellow-500 text-white text-sm rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => setDeletingTask(task)}
                    className="px-3 py-1 bg-red-500 text-white text-sm rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Modals */}
      {showAddModal && (
        <AddTaskModal
          isOpen
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTask}
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
