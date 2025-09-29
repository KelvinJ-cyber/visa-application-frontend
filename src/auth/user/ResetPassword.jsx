// src/pages/ResetPassword.js
import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../services/axios.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const params = new URLSearchParams(search);
  const prefilledEmail = params.get("email") || "";

  const [email, setEmail] = useState(prefilledEmail);
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", message: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // cooldown for resend OTP (seconds)
  const RESEND_COOLDOWN = 30;
  const [cooldown, setCooldown] = useState(0);
  const cooldownRef = useRef(null);

  useEffect(() => {
    if (prefilledEmail) setEmail(prefilledEmail);
  }, [prefilledEmail]);

  useEffect(() => {
    if (cooldown > 0) {
      cooldownRef.current = setTimeout(() => setCooldown(cooldown - 1), 1000);
    }
    return () => clearTimeout(cooldownRef.current);
  }, [cooldown]);

  const validate = () => {
    if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
      setNotification({
        type: "error",
        message: "Please enter a valid email.",
      });
      return false;
    }
    if (!otp.trim()) {
      setNotification({
        type: "error",
        message: "Enter the OTP sent to your email.",
      });
      return false;
    }
    if (newPassword.length < 6) {
      setNotification({
        type: "error",
        message: "Password must be at least 6 characters.",
      });
      return false;
    }
    return true;
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setNotification({ type: "", message: "" });
    if (!validate()) return;

    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/user/reset-password", {
        email: email.trim(),
        otp: otp.trim(),
        newPassword,
      });

      setShowSuccessModal(true);
      setNotification({
        type: "success",
        message: data?.message || "Password reset successful.",
      });

      setTimeout(() => {
        setShowSuccessModal(false);
        navigate("/login");
      }, 5500);
    } catch (err) {
      setNotification({
        type: "error",
        message:
          err.response?.data?.error ||
          "Failed to reset password. Check OTP and try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (cooldown > 0) return; // still cooling down
    setResendLoading(true);
    setNotification({ type: "", message: "" });
    try {
      const { data } = await axios.post("/api/auth/user/request-reset-otp", {
        email: email,
      });
      setNotification({
        type: "success",
        message: data.message || "OTP resent. Check your email.",
      });
      setCooldown(RESEND_COOLDOWN);
    } catch (err) {
      setNotification({
        type: "error",
        message: err.response?.data?.message || "Failed to resend OTP.",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-full max-w-md p-8 bg-white border border-black/5 rounded-2xl shadow-md">
          <h1 className="text-2xl font-semibold text-black mb-2 flex justify-center ">
            Reset your password
          </h1>
          <p className="text-sm text-gray-600 mb-6 flex justify-center">
            Use the OTP sent to your email to set a new password.
          </p>

          {notification.message && (
            <div
              className={`mb-4 p-3 rounded-md ${
                notification.type === "error"
                  ? "bg-red-50 border border-red-100"
                  : "bg-green-50 border border-green-100"
              }`}
            >
              <p
                className={`text-sm ${
                  notification.type === "error"
                    ? "text-red-700"
                    : "text-green-800"
                }`}
              >
                {notification.message}
              </p>
            </div>
          )}

          <form onSubmit={handleReset} className="space-y-4">
            <label className="block text-sm font-medium text-black">
              Email
            </label>
            <Input
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10"
              required
            />

            <div>
              <label className="block text-sm font-medium mb-3 text-black">
                OTP
              </label>
              <div className="flex gap-2">
                <Input
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10 "
                />
                <Button
                  type="button"
                  className="px-3 py-2 text-sm border border-black/5 bg-white text-black hover:bg-gray-400"
                  onClick={handleResend}
                  disabled={resendLoading || cooldown > 0}
                >
                  {resendLoading
                    ? "Sending..."
                    : cooldown > 0
                    ? `Resend (${cooldown}s)`
                    : "Resend"}
                </Button>
              </div>
            </div>

            <label className="block text-sm font-medium text-black">
              New password
            </label>
            <Input
              type="password"
              name="newPassword"
              placeholder="New password (min 6 chars)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10 "
            />

            <Button
              className="w-full mt-3 py-3 rounded-lg font-semibold bg-black text-white 
                                     transition-all duration-300 ease-in-out 
                                     hover:bg-[#333] hover:scale-105 hover:shadow-lg 
                                     active:scale-95"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Reseting
                </div>
              ) : (
                "Reset Password"
              )}
            </Button>

            <div className="text-center mt-2">
              <button
                type="button"
                className="text-sm text-gray-600 underline underline-offset-2"
                onClick={() => navigate("/login")}
              >
                Back to Login
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-xs bg-white border-black/5">
          <DialogHeader className="flex flex-col items-center">
            <div className="w-24 h-24 flex items-center justify-center">
              {/* Animated check SVG */}
              <svg viewBox="0 0 120 120" className="w-20 h-20">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                  strokeDasharray="339.292"
                  strokeDashoffset="339.292"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="339.292"
                    to="0"
                    dur="0.6s"
                    fill="freeze"
                  />
                </circle>
                <path
                  d="M34 62 L52 80 L86 44"
                  fill="none"
                  stroke="#000"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeDasharray="100"
                  strokeDashoffset="100"
                >
                  <animate
                    attributeName="stroke-dashoffset"
                    from="100"
                    to="0"
                    dur="0.5s"
                    begin="0.55s"
                    fill="freeze"
                  />
                </path>
              </svg>
            </div>

            <DialogTitle className="mt-2 text-lg font-semibold text-black">
              Password Reset
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 text-center">
              Your password was reset successfully. Please log in with your new
              password. Don't forget your new password!
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <div className="w-full">
              <Button
                onClick={() => {
                  setShowSuccessModal(false);
                  navigate("/login");
                }}
                className="w-full bg-black text-white"
              >
                Go to Login
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ResetPassword;
