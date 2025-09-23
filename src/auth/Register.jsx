import React from "react";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Mail, Lock, User } from "lucide-react";
import axios from "../utils/axios.js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Register = () => {
  const [currentState, setCurrentState] = useState("register");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

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
      const response = await axios.post("/api/auth/user", {
        firstName: registerFormData.firstName,
        lastName: registerFormData.lastName,
        email: registerFormData.email,
        password: registerFormData.password,
      });

      setMessage({
        type: "success",
        text: " Registration successful! Please check your email for verification code.",
      });
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
            className="min-h-screen flex items-center justify-center bg-[#f2f4f8] p-8 w-200"
            style={{
                fontFamily: 'var(--font-ubuntu)',
                backgroundImage: "url('./Group.png')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <div className="w-full max-w-md bg-white rounded-2xl p-8 shadow-[0_8px_24px_rgba(0,0,0,0.08)]">
                <div className="text-sm text-gray-500 mb-2">
                    Hey Tourist!, Travel the world with us{" "}
                </div>
                <h2 className="text-2xl font-semibold text-black mb-12">
                    User Registration
                </h2>

                <form onSubmit={handleRegisterSubmit} className="space-y-4">
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
                                type="password"
                                placeholder="••••••••"
                                value={registerFormData.password}
                                onChange={(e) =>
                                    setRegisterFormData({
                                        ...registerFormData,
                                        password: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#004aad]/10 pl-8"
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
                                type="password"
                                placeholder="••••••••"
                                value={registerFormData.confirmPassword}
                                onChange={(e) =>
                                    setRegisterFormData({
                                        ...registerFormData,
                                        confirmPassword: e.target.value,
                                    })
                                }
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg text-sm transition-colors focus:outline-none focus:border-[#333] focus:ring-2 focus:ring-[#004aad]/10 pl-8"
                            />
                        </div>
                    </div>
                    <Button
                        className="w-full mt-3 py-3 rounded-lg font-semibold bg-black text-white 
                     transition-all duration-300 ease-in-out 
                     hover:bg-[#333] hover:scale-105 hover:shadow-lg 
                     active:scale-95"
                    >
                        Let's goo!
                    </Button>
                </form>

                <div className="text-center mt-4 text-sm text-gray-600">
                    Already have an account?{"  "}
                    <a
                        href="/signup"
                        className="text-[#000000] font-medium hover:underline"
                    >
                        Sign In
                    </a>
                </div>
            </div>
        </div>
    </>
);
};

export default Register;
