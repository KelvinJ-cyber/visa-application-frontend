import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './auth/user/Register'
import VerifyEmail from './auth/user/VerifyEmail'
import Login from './auth/user/Login';

function App() {

  return (
  <Router>
    <Routes>
         <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
    </Routes>
  </Router>
  )
}

export default App
