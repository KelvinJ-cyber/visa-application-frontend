import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Register from '@/auth/user/Register'
import VerifyEmail from '@/auth/user/VerifyEmail'
import Login from '@/auth/user/Login';
import RequestResetOtp from '@/auth/user/RequestResetOtp';
import ResetPassword from '@/auth/user/ResetPassword';
import AdminLogin from '@/auth/admin/AdminLogin';
import DashBoard from '@/user/DashBoard';
import Page from "@/components/landing_page/page";
const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/*Landing page */}
        <Route path="/" element= {<Page/>}/>

        {/* User Auth routes  */}
        <Route path="/register" element={<Register />} />
        <Route path="/verify" element={<VerifyEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/request-reset-otp" element={<RequestResetOtp />} />
        <Route path="/reset-password" element={<ResetPassword />} />

        {/* Admin Auth routes  */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
