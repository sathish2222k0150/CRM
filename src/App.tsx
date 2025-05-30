import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import AuthVerify from './components/AuthVerify';
import StudentDetails from './components/Datas/StudentDetails';
import NotificationPage from './components/Datas/Notification';

function App() {
  return (
    <Router>
      <div className="App">
        <ToastContainer />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route 
            path="/dashboard" 
            element={
              <AuthVerify>
                <Dashboard />
              </AuthVerify>
            } 
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/students/:id" element={<StudentDetails />} />
          <Route path="/Notification" element={<NotificationPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App