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
const STATUS_COLOR = {
  DRAFT: "gray",
  SUBMITTED: "blue",
  UNDER_REVIEW: "yellow",
  APPROVED: "green",
  REJECTED: "red",
};

function getColorForStatus(status) {
  if (!status) return "gray";
  return STATUS_COLOR[status.toUpperCase()] || "gray";
}

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  async getApplicationStatus() {
    await delay(800); // Simulate network delay
    // if (Math.random() < 0.1) {
    //   throw new Error("Failed to fetch application status");
    // }

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
    await delay(1000);

    const { data } = await instance.get("/api/user/notification");
    return { data: data };
  },
  async getUpcomingAppointments() {
    await delay(1000);
    return { data: mockData.upcomingAppointments };
  },

  async getApplication() {
    await delay(1000);
    const { data } = await instance.get("/api/user/applications"); // example endpoint
    // assume data is an array
    const transformedApplication = (Array.isArray(data) ? data : []).map(
      (app) => ({
        ...app,
        status: (app.status || "").toUpperCase(),
        // simple color name:
        statusColor: getColorForStatus(app.status),
      })
    );
    return { data: transformedApplication };
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
