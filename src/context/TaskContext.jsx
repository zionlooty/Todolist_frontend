import React, { createContext, useState, useEffect } from "react"

export const TaskContext = createContext()

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([])

  
  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || []
    setTasks(storedTasks)
  }, [])

 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks))
  }, [tasks])

  return (
    <TaskContext.Provider value={{ tasks, setTasks }}>
      {children}
    </TaskContext.Provider>
  )
}
