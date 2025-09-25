import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './auth/user/Register'
import VerifyEmail from './auth/user/VerifyEmail'
import Login from './auth/user/Login';
import RequestResetOtp from './auth/user/RequestResetOtp';
import ResetPassword from './auth/user/ResetPassword';

function App() {

  return (
  <Router>
    <Routes>
         <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-reset-otp" element={<RequestResetOtp />} />
         <Route path="/reset-password" element={<ResetPassword />} />
    </Routes>
  </Router>
  )
}

export default App
