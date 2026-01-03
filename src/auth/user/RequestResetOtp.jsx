import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../services/axios.js";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import instance from "../../services/axios.js";

const RequestResetOtp = () => {
  const [email, setEmail] = useState({ email: "" });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", content: "" });
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const navigate = useNavigate();

  //   const validateEmail = (value) => /^\S+@\S+\.\S+$/.test(value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ type: "", content: "" });
    // if (!validateEmail(email)) {
    //   setNotification({
    //     type: "error",
    //     content: "Please enter a valid email address.",
    //   });
    //   return;
    // }
    setLoading(true);

    try {
      const response = await instance.post("/api/auth/user/request-reset-otp", {
        email: email.email,
      });
      setShowSuccessModal(true);
      setNotification({
        type: "success",
        content: response.data?.message || "OTP sent. Check your email.",
      });

      // after short delay navigate to reset page with email in query
      setTimeout(() => {
        setShowSuccessModal(false);
        navigate(`/reset-password?email=${encodeURIComponent(email.email)}`);
      }, 5500);
    } catch (err) {
      setNotification({
        type: "error",
        content:
          err.response?.data?.message || "Failed to send OTP. Try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="ml-230 w-120  min-h-screen mt-50  ">
        <div className="w-full mx-4 sm:mx-auto sm:max-w-md p-6 bg-white border border-black/5 rounded-2xl shadow-md">
          <h1 className="text-2xl font-semibold text-black mb-2 justify-center flex">
            Forgot your password?
          </h1>
          <p className="text-sm text-gray-600 mb-6 ml-6">
            Enter the email for your account and we'll send an OTP{" "}
            <span className=" flex justify-center">
              to reset your password.{" "}
            </span>
          </p>

          {notification.content && (
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
                {notification.content}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block ml-2 text-sm font-medium text-black">
              Email
            </label>
            <input
              name="email"
              placeholder="you@example.com"
              value={email.email}
              onChange={(e) => setEmail({ ...email, email: e.target.value })}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10"
              required
            />

            <Button
              className="w-full mt-3 py-3 rounded-lg font-semibold bg-black text-white 
                                     transition-all duration-300 ease-in-out 
                                     hover:bg-[#333] hover:scale-105 hover:shadow-lg 
                                     active:scale-95"
              disabled={loading}
              onClick={handleSubmit}
            >
              {loading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Sending OTP....
                </div>
              ) : (
                "Send OTP"
              )}
            </Button>

            <div className="text-center mt-2">
              <button
                type="button"
                className="text-sm text-gray-600  underline-offset-2"
                onClick={() => navigate("/login")}
              >
                Remembered? <span className=" cursor-pointer hover:underline ">Back to Login </span> 
              </button>
            </div>
          </form>
        </div>
      </div>

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
              OTP Sent
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 text-center">
              Check your email for the one-time code to reset your password.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4">
            <div className="w-full">
              <Button
                onClick={() => setShowSuccessModal(false)}
                className="w-full bg-black text-white"
              >
                Okay
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RequestResetOtp;
