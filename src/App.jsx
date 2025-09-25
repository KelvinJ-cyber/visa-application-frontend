import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from './auth/user/Register'
import VerifyEmail from './auth/user/VerifyEmail'
import Login from './auth/user/Login';
import RequestResetOtp from './auth/user/RequestResetOtp';
import ResetPassword from './auth/user/ResetPassword';
import AdminLogin from './auth/admin/AdminLogin';

function App() {

  return (
  <Router>
    <Routes>

       {/* User Auth routes  */}
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-reset-otp" element={<RequestResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Auth routes  */}
        <Route path="/admin/login" element={<AdminLogin />} />

    
    </Routes>
  </Router>
  )
}

export default App
