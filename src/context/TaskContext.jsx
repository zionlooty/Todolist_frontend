import React, { createContext, useState, useEffect } from "react";
import API from "../api/axios";
import { toast } from "sonner";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  
  const fetchTasks = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setTasks([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const res = await API.get("/task", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data.tasks || []);
    } catch (error) {
      console.error(" Error fetching tasks:", error.response?.data || error);
      if (token) toast.error("Failed to load tasks");
    } finally {
      setLoading(false);
    }
  };

 
  const addTask = async (newTask) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.post("/task", newTask, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.data.message === "Task created successfully") {
        toast.success("Task added successfully");
      
        // Add new task instantly to top of list
        setTasks((prevTasks) => [res.data.task, ...prevTasks]);
      
        // Optionally refresh backend in background
        fetchTasks();
      } else {
        toast.error(res.data.message || "Failed to add task");
      }
      
    } catch (error) {
      console.error(" Add task error:", error.response?.data || error);
      toast.error(error.response?.data?.message || "Failed to add task");
    }
  };


  const updateTask = async (updatedTask) => {
    try {
      const token = localStorage.getItem("token");
      const res = await API.put(`/task/${updatedTask.task_id}`, updatedTask, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Task updated successfully");
      fetchTasks();
    } catch (err) {
      console.error(" Update task error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to update task");
    }
  };

  const deleteTask = async (task_id) => {
    try {
      const token = localStorage.getItem("token");
      await API.delete(`/task/${task_id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      setTasks((prev) => prev.filter((t) => t.task_id !== task_id));
      toast.success("Task deleted successfully");
    } catch (err) {
      console.error(" Delete task error:", err.response?.data || err);
      toast.error(err.response?.data?.message || "Failed to delete task");
    }
  };
  

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        fetchTasks,
        addTask,
        updateTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
