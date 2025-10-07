import React, { useContext, useState, useMemo } from "react";
import { TaskContext } from "../context/TaskContext";
import AddTaskModal from "../components/AddTaskModal";
import { FaPlus, FaCalendarAlt, FaTag, FaBolt, FaCheckCircle } from "react-icons/fa";

const TodayPage = () => {
  const { tasks, addTask, loading } = useContext(TaskContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const normalizeDate = (dateString) =>
    dateString ? (dateString.includes("T") ? dateString.split("T")[0] : dateString) : null;


  const todayTasks = useMemo(
    () => tasks.filter((task) => normalizeDate(task.due_date) === today),
    [tasks, today]
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
       
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Today’s Tasks</h1>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700"
          >
            <FaPlus /> Add Task
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : todayTasks.length === 0 ? (
          <p className="text-center text-gray-600">🎉 No tasks for today!</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {todayTasks.map((task) => (
              <div key={task.task_id} className="bg-white p-6 rounded-xl shadow">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <FaCalendarAlt className="text-blue-500" /> {normalizeDate(task.due_date)}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <FaTag className="text-purple-500" /> {task.category}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <FaBolt className="text-yellow-500" /> {task.priority}
                </p>
                <p className="flex items-center gap-2 text-sm text-gray-500">
                  <FaCheckCircle
                    className={task.status === "Completed" ? "text-green-500" : "text-gray-400"}
                  />
                  {task.status}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      
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
