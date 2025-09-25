import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", 
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // Request timeout in milliseconds
});

// Interceptor to add token if available
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;