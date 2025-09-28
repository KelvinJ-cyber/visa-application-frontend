import { Card, CardTitle ,CardContent, CardHeader, CardDescription } from "@/components/ui/card";
import React from "react";
import { toast } from "sonner";
import { useState } from "react";
import { CheckCircle, AlertCircle, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import axios from "../../utils/axios.js";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input.jsx";
import { Label } from "@/components/ui/label.jsx";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", content: "" });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.email.trim()) return "Email is required";
    if (!/\S+@\S+\.\S+/.test(formData.email)) return "Email is invalid";
    if (!formData.password.trim()) return "Password is required";
    return null;
  };

  const handleSubmit = async () => {
    const error = validateForm();
    if (error) {
      setNotification({ type: "error", content: error });
      return;
    }
    setLoading(true);
    setNotification({ type: "", content: "" });

    try {
      // API call here
      const response = await axios.post("/api/auth/user/login", {
        email: formData.email,
        password: formData.password,
      });

      // Extract JWT token from response and user info
      const { token, userId, userInfo, expiresAt } = response.data;
      if (!token) {
        throw new Error("No token received from server");
      }

      // Store token and user info in localStorage
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("tokenExpiry", expiresAt);

      console.log(localStorage);
      setNotification({
        type: "success",
        content: "Login successful! Redirecting....",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 2500);
      setTimeout(() => {
         toast.success("Welcome back, "+ userInfo.firstName, {
          description : "You have successfully logged in.",
         });
      }, 1500)
    } catch (err) {
      setNotification({
        type: "error",
        content:
          err.response?.data?.message ||
          "Invalid credentials. Please try again",
      });
    }finally{
      setLoading(false);
    }
  };
  return (
  <>
    <Card className="flex ml-230 h-120 shadow-lg w-120 mt-40" style={{ fontFamily: "var(--font-ubuntu)" }}>
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back !</CardTitle>
        <CardDescription>Sign in to <span className=" font-bold">TravelSure</span></CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="email"
                name="email"
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                       onChange={(e) =>
                      setFormData({
                        ...formData,
                        email: e.target.value,
                      })
                    }
             className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10 pl-9"
                disabled={loading}
              />
            </div>
          </div>

          <div className="space-y-2 mt-5">
            <div className="flex items-center justify-between mb-1">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => navigate("/request-reset-otp")}
                className="text-xs cursor-pointer text-blue-400 hover:underline font-medium focus:outline-none"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={formData.password}
                     onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10 pl-9"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>  

          {notification.content && (
            <Alert className={notification.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}>
              {notification.type === 'error' ? (
                <AlertCircle className="h-4 w-4 text-red-600" />
              ) : (
                <CheckCircle className="h-4 w-4 text-green-600" />
              )}
              <AlertDescription className={notification.type === 'error' ? 'text-red-800' : 'text-green-800'}>
                {notification.content}
              </AlertDescription>
            </Alert>
          )}

          <Button
            onClick={handleSubmit}
             className="w-full mt-3 py-3 rounded-lg font-semibold bg-black text-white 
                                     transition-all duration-300 ease-in-out 
                                     hover:bg-[#333] hover:scale-105 hover:shadow-lg 
                                     active:scale-95"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Signing In...
              </div>
            ) : (
              'Sign In'
            )}
          </Button>

          <div className="text-center">
            <span className="text-sm text-gray-600">Don't have an account? </span>
            <button
              type="button"
              onClick={() => navigate("/register")}
              className="text-[14px] cursor-pointer text-blue-400 hover:underline font-medium focus:outline-none"
            >
              Create Account
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  </>
  );
};

export default Login;
