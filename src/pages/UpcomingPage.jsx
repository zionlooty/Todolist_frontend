import React, { useContext, useState } from "react"
  
import AddTaskModal from "../components/AddTaskModal"
import { TaskContext } from "../context/TaskContext"

const UpcomingPage = () => {
  const { tasks, setTasks } = useContext(TaskContext)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // today’s date
  const today = new Date().toISOString().split("T")[0]

  // filter only upcoming tasks
  const upcomingTasks = tasks.filter((task) => task.dueDate > today)

  // add new task (shared state, visible everywhere)
  const handleAddTask = (taskData) => {
    const newTask = { id: Date.now(), status: "pending", ...taskData }
    setTasks((prev) => [...prev, newTask])
  }

  return (
    <div className="flex justify-center mt-10">
      <div className="bg-white shadow-lg rounded-xl w-[600px] p-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">Upcoming Tasks</h1>
          <p className="text-gray-500 text-sm">
            Plan ahead with your upcoming tasks
          </p>
        </div>

        {upcomingTasks.length === 0 ? (
          <div className="flex flex-col items-center text-center">
            <p className="text-gray-600 mb-6">
              No upcoming tasks. Consider planning ahead!
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
            {upcomingTasks.map((task) => (
              <li key={task.id} className="border p-4 rounded-lg shadow">
                <h3 className="font-semibold">{task.title}</h3>
                <p className="text-sm text-gray-600">{task.description}</p>
                <p className="text-sm">📅 {task.dueDate}</p>
                <p className="text-sm">🏷️ {task.category}</p>
                <p className="text-sm">⚡ {task.priority}</p>
              </li>
            ))}
          </ul>
        )}
      </div>

      <AddTaskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleAddTask}
      />
    </div>
  )
}

export default UpcomingPage
