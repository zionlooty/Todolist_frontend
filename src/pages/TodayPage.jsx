import React, { useContext, useState } from "react"
import API from "../api/axios"
import { toast } from "sonner"
import AddTaskModal from "../components/AddTaskModal"
import { TaskContext } from "../context/TaskContext"

const TodayPage = () => {
  const { tasks, setTasks } = useContext(TaskContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // safer "today" string (YYYY-MM-DD)
  const today = new Date().toLocaleDateString("en-CA") // ✅ handles timezone

  // filter tasks due today
  const todayTasks = tasks.filter((task) => {
    if (!task.due_date) return false
    const taskDate = new Date(task.due_date).toLocaleDateString("en-CA")
    return taskDate === today
  })

  // Add new task and sync with DB
  const handleAddTask = async (taskData) => {
    try {
      const res = await API.post("/task", {
        ...taskData,
        due_date: today, // ✅ force today's date in safe format
      })

      // backend should return the new task
      const newTask = res.data.task

      // update context so UI refreshes automatically
      setTasks((prev) => [...prev, newTask])

      toast.success("Task added successfully")
      setIsModalOpen(false)
    } catch (error) {
      console.error("Error adding task:", error.response?.data || error.message)
      toast.error("Failed to add task")
    }
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-xl w-[600px] p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Today's Tasks</h1>
          <p className="text-gray-500 text-sm">
            Stay focused on what’s due today ({today})
          </p>
        </div>

        {todayTasks.length === 0 ? (
          <div className="flex flex-col items-center text-center">
            <p className="text-gray-600 mb-6">
              No tasks for today. Enjoy your free time!
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              + Add Task
            </button>
          </div>
        ) : (
          <ul className="space-y-4">
            {todayTasks.map((task, index) => (
              <li
                key={task.task_id || index}
                className="border p-4 rounded-lg shadow"
              >
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm">📅 {new Date(task.due_date).toLocaleDateString("en-CA")}</p>
                <p className="text-sm">🏷️ {task.category}</p>
                <p className="text-sm">⚡ {task.priority}</p>
                <p className="text-sm">📌 {task.status}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Add Task Modal */}
      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
      />
    </div>
  )
}

export default TodayPage
