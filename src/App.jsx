import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Mainlayout from "./layout/Mainlayout"
import TaskPage from "./pages/TaskPage"
import TodayPage from "./pages/TodayPage"
import UpcomingPage from "./pages/UpcomingPage"
import { TaskProvider } from "./context/TaskContext"
import LoginPage from "./pages/Loginpage"
import SignupPage from "./pages/signuppage"



const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token")
  return token ? children : <Navigate to="/login" replace />
}


const LoginAuth = ({ children }) => {
  const token = localStorage.getItem("token")
  return !token ? children : <Navigate to="/" replace />
}

function App() {
  return (
    <TaskProvider>
      <BrowserRouter>
        <Routes>
          {/* Auth routes */}
          <Route
            path="/login"
            element={
              <LoginAuth>
                <LoginPage/>
              </LoginAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <LoginAuth>
                <SignupPage/>
              </LoginAuth>
            }
          />

          {/* Protected routes with layout */}
          <Route
            element={
              <ProtectedRoute>
                <Mainlayout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Dashboard />} />
            <Route path="/tasks" element={<TaskPage />} />
            <Route path="/today" element={<TodayPage />} />
            <Route path="/upcoming" element={<UpcomingPage />} />
          </Route>

          {/* Catch-all → redirect invalid routes to login */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </TaskProvider>
  )
}

export default App
