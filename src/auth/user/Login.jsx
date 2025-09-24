import { Card, CardContent, CardHeader } from "@/components/ui/card";
import React from "react";
import { useState } from "react";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState({ type: "", content: "" });
  const [showPassword, setShowPassword] = useState(false);

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
      localStorage.setItem("authToken", token);
      localStorage.setItem("userId", userId);
      localStorage.setItem("userInfo", JSON.stringify(userInfo));
      localStorage.setItem("tokenExpiry", expiresAt);

      setNotification({
        type: "success",
        content: "Login successful! Redirecting....",
      });
      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      setNotification({
        type: "error",
        content:
          err.response?.data?.message ||
          "Invalid credentials. Please try again",
      });
    }
  };
  return (
  <>
  <Card className="w-full max-w-md p-6 shadow-lg">
    <CardHeader className="text-center">
       <CardTitle className="text-2xl font-bold text-gray-800">Welcome Back</CardTitle>
        <CardDescription>Sign in to continue your visa application</CardDescription>
      </CardHeader>
      <CardContent>
        
      </CardContent>
  </Card>
  </>
  );
};

export default Login;
