import bgImage from './assets/image.png';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

const AgentLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState(null);
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    setNotification(null);
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/admin/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: data.email,
          password: data.password,
        }),
      });
      
      if (response.ok) {
        const result = await response.json();
        setNotification({
          type: 'success',
          message: 'Login successful! Redirecting...'
        });
        reset();
        // Simulate redirect after success
        setTimeout(() => {
          setNotification(null);
        }, 6000);
      } else {
        throw new Error('Login failed');
      }
    } catch (error) {
      setNotification({
        type: 'error',
        message: 'Login failed. Please check your credentials and try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleUserLoginClick = () => {
    alert('Redirecting to User Login...');
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Background Image with Overlay */}
      <div className="hidden lg:flex lg:w-3/5 relative">
        <div 
          className="w-full h-full bg-cover bg-center relative"
         style={{ backgroundImage: `url(${bgImage})` }}

        >
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-center px-12">
            <h1 className="text-white text-4xl font-bold mb-4">
              Authorized Access Only
            </h1>
            <p className="text-white text-lg leading-relaxed max-w-md">
              Agents of Devine Travels & Tours can securely log in to manage visa applications and assist clients faster and better.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-2/5 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Welcome Text */}
          <p className="text-gray-600 text-sm mb-2">Welcome Agent</p>
          
          {/* Form Title */}
          <h2 className="text-2xl font-semibold text-blue-600 mb-8">Agent Login</h2>
          
          {/* Notification */}
          {notification && (
            <div className={`mb-4 p-3 rounded-lg flex items-center gap-2 ${
              notification.type === 'success' 
                ? 'bg-green-50 text-green-700 border border-green-200' 
                : 'bg-red-50 text-red-700 border border-red-200'
            }`}>
              {notification.type === 'success' ? (
                <CheckCircle className="w-4 h-4" />
              ) : (
                <XCircle className="w-4 h-4" />
              )}
              <span className="text-sm">{notification.message}</span>
            </div>
          )}
          
          {/* Login Form */}
          <div className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <input
                id="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {

                    message: 'Please enter a valid email address'
                  }
                })}
                placeholder="Enter your email"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.email ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                id="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 2,
                    message: 'Password must be at least 2 characters'
                  }
                })}
                placeholder="Enter your password"
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors ${
                  errors.password ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={isLoading}
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
              )}
            </div>

            {/* Login Button */}
            <button
              type="button"
              onClick={handleSubmit(onSubmit)}
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
            >
              {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
          </div>

          {/* User Login Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Not an agent?{' '}
              <button
                onClick={handleUserLoginClick}
                className="text-blue-600 hover:text-blue-700 font-medium underline"
              >
                Go to User Login
              </button>
            </p>
          </div>
        </div>
      </div>

      {/* Mobile Background for smaller screens */}
      <div className="lg:hidden absolute inset-0 -z-10">
        <div 
          className="w-full h-full bg-cover bg-center"
         style={{ backgroundImage: `url(${bgImage})` }}

        >
          <div className="absolute inset-0 bg-white bg-opacity-95"></div>
        </div>
      </div>
    </div>
  );
};

export default AgentLogin;