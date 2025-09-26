import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // Request timeout in milliseconds
});

const mockData = {
  upcomingAppointments: [
    {
      id: 1,
      type: "Biometric Appointment",
      date: "2025-09-15",
      time: "10:00 AM",
      location: "Visa Application Center",
      status: "scheduled",
    },
  ],
};
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async getApplicationStatus() {
    await delay(800); // Simulate network delay
    if (Math.random() < 0.1) {
      throw new Error("Failed to fetch application status");
    }

    const { data } = await instance.get("/api/user/home");
    const application = {
      ...data[0],
      step: 2,
      totalSteps: 4,
      steps: ["Draft", "Submitted", "Under Review", "Approved/Rejected"],
    };

   
    return { application };
  },
  async getNotifications() {
    await delay(800);

    const { data } = await instance.get("/api/user/notification");
    console.log("Notifications " + data);
    return { data: data };
  },
  async getUpcomingAppointments() {
    await delay(600);
    return { data: mockData.upcomingAppointments };
  },
};

// Request interceptor: attach token
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: handle errors like 401
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 403) {
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default instance;
