import React, { useState, useEffect, useContext } from "react";
import API from "../api/axios";
import StatCard from "../components/statcard";
import Taskitem from "../components/taskitem";
import AddTaskModal from "../components/AddTaskModal";
import { TaskContext } from "../context/TaskContext";
import { FaCheckCircle, FaClock, FaRegCalendarAlt, FaTasks, FaPlus } from "react-icons/fa";

const Dashboard = () => {
  const { addTask } = useContext(TaskContext); // ✅ Use context for adding tasks
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  // 🔹 Fetch all user tasks
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await API.get("/task", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("❌ Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  // 🔹 Normalize date to remove timezone issues
  const normalizeDate = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    return d;
  };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 📊 Calculate statistics
  const totalTasks = tasks.length;
  const completed = tasks.filter((t) => t.status?.toLowerCase() === "completed").length;
  const pending = tasks.filter((t) => t.status?.toLowerCase() === "pending").length;
  const upcoming = tasks.filter((t) => t.due_date && normalizeDate(t.due_date) > today).length;

  // 🕒 Recent 5 tasks
  const recentTasks = [...tasks].sort((a, b) => new Date(b.due_date) - new Date(a.due_date)).slice(0, 5);

  // 🔹 Handle adding task
  const handleAddTask = async (newTask) => {
    await addTask(newTask); // Add using context
    setShowAddModal(false);
    setTasks((prev) => [newTask, ...prev]); // Immediately show new task
  };

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div className="p-6">
      {/* HEADER */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
        <h1 className="text-3xl font-bold mb-4 sm:mb-0 text-gray-800">Dashboard</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Task
        </button>
      </div>

      {/* STAT CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatCard title="Total Tasks" value={totalTasks} color="bg-blue-500" icon={<FaTasks />} />
        <StatCard title="Completed" value={completed} color="bg-green-500" icon={<FaCheckCircle />} />
        <StatCard title="Pending" value={pending} color="bg-yellow-500" icon={<FaClock />} />
        <StatCard title="Upcoming" value={upcoming} color="bg-purple-500" icon={<FaRegCalendarAlt />} />
      </div>

      {/* RECENT TASKS */}
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Recent Tasks</h2>
      {recentTasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentTasks.map((task) => (
            <Taskitem
              key={task.task_id}
              title={task.title}
              status={task.status}
              dueDate={task.due_date}
              description={task.description}
            />
          ))}
        </div>
      )}

      {/* ADD TASK MODAL */}
      {showAddModal && (
        <AddTaskModal
          isOpen
          onClose={() => setShowAddModal(false)}
          onSave={handleAddTask}
        />
      )}
    </div>
  );
};

export default Dashboard;
