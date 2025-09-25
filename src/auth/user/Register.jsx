import React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import axios from "../../utils/axios.js";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const [registerFormData, setRegisterFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: "", text: "" });

    if (registerFormData.password !== registerFormData.confirmPassword) {
      setMessage({ type: "error", text: "Passwords do not match" });
      setLoading(false);
      return;
    }

    if (registerFormData.password.length < 6) {
      setMessage({
        type: "error",
        text: "Password must be at least 6 characters",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post("/api/auth/user/register", {
        firstName: registerFormData.firstName,
        lastName: registerFormData.lastName,
        email: registerFormData.email,
        password: registerFormData.password,
      });

      setMessage({
        type: "success",
        text: " Registration successful! Please check your email for verification code.",
      });
      setTimeout(() => navigate("/verify"), 1500);
    } catch (error) {
      setMessage({
        type: "error",
        text:
          error.response?.data?.message ||
          "Registration failed. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div
        className=" min-h-screen ml-80 flex items-center justify-center bg-[#f2f4f8] p-8 w-400"
        style={{
          fontFamily: "var(--font-ubuntu)",
          backgroundImage: "url('./Group.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
          <div className=" flex justify-center text-sm text-gray-500 mb-2">
            Hey Tourist!, Travel the world with us{" "}
          </div>
          <h2 className="text-2xl flex justify-center font-semibold text-black mb-12">
            User Registration
          </h2>

          <form onSubmit={handleRegisterSubmit} className="space-y-4  mb-20">
            <div className="grid grid-cols-2 gap-4">
              <div className="">
                <label
                  htmlFor="firstName"
                  className="block mr-25 mb-2 text-sm font-medium text-gray-700"
                >
                  First Name
                </label>
                <div className="relative">
                  <User className="absolute mt-1 left-3 top-3 h-4 w-4 text-black" />
                  <input
                    id="firstName"
                    type="text"
                    placeholder="kelvin"
                    value={registerFormData.firstName}
                    onChange={(e) =>
                      setRegisterFormData({
                        ...registerFormData,
                        firstName: e.target.value,
                      })
                    }
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10 pl-9"
                  />
                </div>
              </div>
              <div className="">
                <label
                  htmlFor="lastName"
                  className="block mr-25 mb-2 text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>
                <div className="relative">
                  <input
                    id="lastName"
                    type="text"
                    placeholder="Justin"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10 "
                    value={registerFormData.lastName}
                    onChange={(e) =>
                      setRegisterFormData({
                        ...registerFormData,
                        lastName: e.target.value,
                      })
                    }
                    required
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="email"
                className="block  mr-85 mb-2 text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <div className="relative">
                <Mail className="absolute mt-1 left-3 top-3 h-4 w-4 text-black " />
                <input
                  id="email"
                  type="email"
                  placeholder="kelvin@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#333]/10 pl-9"
                  value={registerFormData.email}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      email: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block mr-85 mb-2 text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute mt-1 left-3 top-3 h-4 w-4 text-black " />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={registerFormData.password}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      password: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#004aad]/10 pl-8 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block mr-65 mb-2 text-sm font-medium text-gray-700"
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute mt-1 left-3 top-3 h-4 w-4 text-black " />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={registerFormData.confirmPassword}
                  onChange={(e) =>
                    setRegisterFormData({
                      ...registerFormData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#004aad]/10 pl-8 pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-3 text-gray-500 focus:outline-none"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  tabIndex={-1}
                >
                  {showConfirmPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </button>
              </div>
            </div>

            {message.text && (
              <Alert
                className={
                  message.type === "error"
                    ? "border-red-100 bg-red-100"
                    : "border-green-100 bg-green-100"
                }
              >
                <AlertDescription
                  className={
                    message.type === "error"
                      ? "text-black font-medium"
                      : "text-black font-medium"
                  }
                >
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

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
                  Creating Account...
                </>
              ) : (
                " Let's goo!"
              )}
            </Button>
          </form>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/login")}
              className="text-sm text-black hover:text-gray-600  font-medium"
            >
              Already have an account?{" "}
              <span className=" text-[14px] cursor-pointer text-blue-400 hover:underline font-medium focus:outline-none">Sign in</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
