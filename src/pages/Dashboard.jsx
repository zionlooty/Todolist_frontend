import React, { useState, useEffect } from "react";
import axios from "axios";
import StatCard from "../components/statcard";
import {
  FaCheckCircle,
  FaClock,
  FaRegCalendarAlt,
  FaTasks,
} from "react-icons/fa";
import Taskitem from "../components/taskitem";

const Dashboard = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/task", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(res.data.tasks || []);
      } catch (err) {
        console.error("Error fetching tasks:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  // 🧮 Stats
  const totalTasks = tasks.length;
  const completed = tasks.filter((task) => task.status === "completed").length;
  const pending = tasks.filter((task) => task.status === "pending").length;

  // 📅 Upcoming: tasks with due date after today
  const today = new Date().toISOString().split("T")[0];
  const upcoming = tasks.filter((task) => task.due_date > today).length;

  // 🕒 Show only 5 most recent tasks, sorted by latest date
  const recentTasks = [...tasks]
    .sort((a, b) => new Date(b.due_date) - new Date(a.due_date))
    .slice(0, 5);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Tasks"
          value={totalTasks}
          color="bg-blue-500"
          icon={<FaTasks />}
        />
        <StatCard
          title="Completed"
          value={completed}
          color="bg-green-500"
          icon={<FaCheckCircle />}
        />
        <StatCard
          title="Pending"
          value={pending}
          color="bg-yellow-500"
          icon={<FaClock />}
        />
        <StatCard
          title="Upcoming"
          value={upcoming}
          color="bg-purple-500"
          icon={<FaRegCalendarAlt />}
        />
      </div>

      {/* Recent tasks */}
      <h2 className="text-xl font-semibold mb-4 mt-6">Recent Tasks</h2>

      {recentTasks.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent tasks found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recentTasks.filter(Boolean).map((task) => (
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
    </div>
  );
};

export default Dashboard;
