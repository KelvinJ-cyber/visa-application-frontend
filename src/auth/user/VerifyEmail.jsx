import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../../utils/axios.js";
import { Loader2, CheckCircle, AlertCircle, ArrowRight } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";

const VerifyEmail = () => {
  const [verification, setVerification] = useState({
    verificationCode: "",
    email: "",
  });
  const [notification, setNotification] = useState({ type: "", content: "" });
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(20);
  const [resendLoading, setResendLoading] = useState(false);
  const [canResend, setCanResend] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleVerify = async (e) => {
    e.preventDefault();
    setLoading(true);
    setNotification({ type: "", content: "" });
    try {
      const response = await axios.post("/api/auth/user/verify", {
        email: verification.email,
        verificationCode: verification.verificationCode,
      });
      setNotification({
        type: "success",
        content: response.data?.message || "Verification successful!",
      });
      setTimeout(() => {
        navigate("/login");
      }, 5500);
    } catch (err) {
      setNotification({
        type: "error",
        content: err.response?.data?.message || "Verification failed",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async (e) => {
    e.preventDefault();
    setResendLoading(true);
    setNotification({ type: "", content: "" });

    try {
      const response = await axios.post("/api/auth/user/resend-verification", {
        email: verification.email,
      });
      setNotification({
        type: "success",
        content:
          response.data?.message || "Verification code resent successfully!",
      });
      setCanResend(false);
      setVerification({ ...verification, verificationCode: "" });
      setCountdown(20);
    } catch (err) {
      setNotification({
        type: "error",
        content:
          err.response?.data?.message ||
          "Failed to resend code. Please try again.",
      });
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <>
      <div
        className="max-w-md mt-70 flex-1 mx-auto p-6 rounded-xl shadow-lg border h-100 bg-white"
        style={{
          fontFamily: "var(--font-ubuntu)",
        }}
      >
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center opacity-10"
          style={{ backgroundImage: "url('/Group.png')" }}
        />
        <h2 className="text-2xl flex justify-center font-bold mb-4">Verify Email</h2>
        {notification.content && (
          <Alert
            className={
              notification.type === "error"
                ? "border-red-200 bg-red-50"
                : "border-green-200 bg-green-50"
            }
          >
            {notification.type === "error" ? (
              <AlertCircle className="h-4 w-4 text-red-600" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-600" />
            )}
            <AlertDescription
              className={
                notification.type === "error"
                  ? "text-red-800"
                  : "text-green-800"
              }
            >
              {notification.content}
            </AlertDescription>
          </Alert>
        )}

        <div className="mt-1">
          <form onSubmit={handleVerify} className="space-y-4 mt-4">
            <input
              placeholder="Enter verification code"
              type="text"
              value={verification.verificationCode}
              onChange={(e) =>
                setVerification({
                  ...verification,
                  verificationCode: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10"
            />
            <input
              placeholder="Enter your email"
              value={verification.email}
              type="email"
              onChange={(e) =>
                setVerification({
                  ...verification,
                  email: e.target.value,
                })
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10 "
            />
            <Button
              className="w-full mt-3 py-3 rounded-lg font-semibold bg-black text-white 
                                     transition-all duration-300 ease-in-out 
                                     hover:bg-[#333] hover:scale-105 hover:shadow-lg 
                                     active:scale-95"
              disabled={loading}
              type="submit"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Verifying
                </>
              ) : (
                " Verify!"
              )}
              <ArrowRight className="mr-2 h-4 w-4" />
            </Button>
          </form>
        </div>

        <div className="text-center space-y-2 mt-5">
          <p className="text-sm text-gray-600">Didn't receive the code?</p>
          {canResend ? (
            <Button
              variant="outline"
              onClick={handleResend}
              disabled={resendLoading}
              className="text-black border-[#333] hover:border-[#333] "
            >
              {resendLoading ? "Resending..." : "Resend Code"}
            </Button>
          ) : (
            <p className="text-sm text-gray-500">
              Resend in {countdown} seconds
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default VerifyEmail;
