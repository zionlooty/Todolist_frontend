import React, { useContext, useState, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import AddTaskModal from "../components/AddTaskModal";
import { FaPlus, FaCalendarAlt, FaTag, FaBolt, FaCheckCircle } from "react-icons/fa";

const TodayPage = () => {
  const { tasks, addTask, loading } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Get today's date normalized
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const todayDate = today.toISOString().split("T")[0];

  const normalizeDate = (dateString) => {
    if (!dateString) return null;
    const d = new Date(dateString);
    d.setHours(0, 0, 0, 0);
    return d.toISOString().split("T")[0];
  };

  const todayTasks = useMemo(
    () => tasks.filter((task) => normalizeDate(task.due_date) === todayDate),
    [tasks, todayDate]
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-gray-800 mb-1">
              Today’s Tasks
            </h1>
            <p className="text-gray-500 text-sm">
              Stay focused — tackle what’s due today and get things done.
            </p>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="mt-4 sm:mt-0 flex items-center gap-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl font-medium shadow hover:bg-blue-700 transition"
          >
            <FaPlus /> Add Task
          </button>
        </div>

        {/* MAIN CONTENT */}
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todayTasks.length === 0 ? (
          <div className="text-center mt-16">
            <p className="text-2xl text-gray-600">🎉 No tasks for today!</p>
            <p className="text-gray-400 mt-2">
              You’re all caught up — enjoy a break, you’ve earned it.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {todayTasks.map((task) => (
              <div
                key={task.task_id}
                className="bg-white border border-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all duration-200"
              >
                <h3 className="font-semibold text-lg text-gray-800 mb-1">
                  {task.title}
                </h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                  {task.description}
                </p>

                <div className="space-y-2 text-sm text-gray-500">
                  <p className="flex items-center gap-2">
                    <FaCalendarAlt className="text-blue-500" />
                    {normalizeDate(task.due_date)}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaTag className="text-purple-500" />
                    {task.category}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaBolt className="text-yellow-500" />
                    {task.priority}
                  </p>
                  <p className="flex items-center gap-2">
                    <FaCheckCircle
                      className={
                        task.status === "Completed"
                          ? "text-green-500"
                          : "text-gray-400"
                      }
                    />
                    {task.status}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* MODAL */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={(newTask) => {
          addTask(newTask);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
};

export default TodayPage;
