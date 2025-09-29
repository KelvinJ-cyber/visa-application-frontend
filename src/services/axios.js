// Attach JWT token to uploadApi requests
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080",
  headers: { "Content-Type": "application/json" },
  timeout: 10000, // Request timeout in milliseconds
});

// Create a separate instance for file uploads
const uploadApi = axios.create({
  baseURL: 'http://localhost:8080/api/user/documents',
  timeout: 30000, // Longer timeout for file uploads
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});
uploadApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);
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
    documentsChecklist: [
    {
      id: 1,
      name: 'Passport Copy',
      description: 'Clear copy of your passport bio page',
      status: 'missing',
      uploadedDate: null,
      required: true
    },
    {
      id: 2,
      name: 'Passport Photos',
      description: '2 recent passport-sized photographs',
      status: 'missing',
      uploadedDate: null,
      required: true
    },
    {
      id: 3,
      name: 'Bank Statements',
      description: 'Last 3 months bank statements',
      status: 'missing',
      uploadedDate: null,
      required: true
    },
    {
      id: 4,
      name: 'Travel Insurance',
      description: 'Valid travel insurance certificate',
      status: 'missing',
      uploadedDate: null,
      required: true
    },
    {
      id: 5,
      name: 'Proof of Accommodation',
      description: 'Hotel bookings or invitation letter',
      status: 'missing',
      uploadedDate: null,
      required: true
    },
    {
      id: 6,
      name: 'Flight Itinerary',
      description: 'Round-trip flight reservation',
      status: 'missing',
      uploadedDate: null,
      required: false
    }
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

// Helper to persist and load checklist from localStorage
const CHECKLIST_KEY = 'documentsChecklist';

function loadChecklist() {
  const stored = localStorage.getItem(CHECKLIST_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // fallback to default if corrupted
      return mockData.documentsChecklist;
    }
  }
  return mockData.documentsChecklist;
}

function saveChecklist(checklist) {
  localStorage.setItem(CHECKLIST_KEY, JSON.stringify(checklist));
}

// Use persisted checklist if available
mockData.documentsChecklist = loadChecklist();

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
    const { data } = await instance.get("/api/user/applications"); 
    const transformedApplication = data.map(
      (app) => ({
        ...app,
        status: (app.status || "").toUpperCase(),
        // simple color name:
        statusColor: getColorForStatus(app.status),
      })
    );
   const mainApplicationId = transformedApplication[0]?.applicationId ?? null;
    return { data: transformedApplication, mainApplicationId  };
  },

  async submitApplication(applicationId){
    await delay(500);
    const { data } = await instance.post(`/api/user/applications/${applicationId}/submit`);
    return { data };
  },

    // Documents APIs
   async getDocumentsChecklist(applicationId) {
    await delay(600);
    // Always return the latest from localStorage
    mockData.documentsChecklist = loadChecklist();
    return { data: mockData.documentsChecklist };
  },

  async getUploadedDocuments(applicationId) {
    try {
      console.log(`📋 Fetching uploaded documents for application: ${applicationId}`);
      
      // Real implementation: Make actual API call
      const response = await api.get(`/applications/${applicationId}/documents`);
      
      console.log('✅ Successfully fetched uploaded documents:', response.data);
      return response;
      
    } catch (error) {
      console.error('❌ Failed to fetch uploaded documents:', error);
      
      // Handle different types of errors
      if (error.response) {
        const message = error.response.data?.message || `Failed to fetch documents with status ${error.response.status}`;
        throw new Error(message);
      } else if (error.request) {
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        throw new Error(error.message || 'Failed to fetch documents. Please try again.');
      }
    }
  },
  
  async uploadDocument(applicationId, documentId, file, onProgress = null) {
    try {
      // Create FormData for the actual API request
      const formData = new FormData();
      
  // Add the required fields
  formData.append('file', file); // The actual file data
      
      console.log(' Making real API call to upload document...');
      
  
  const response = await uploadApi.post(`/upload/${applicationId}/${documentId}`, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.lengthComputable) {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            // Call the progress callback if provided
            if (onProgress && typeof onProgress === 'function') {
              onProgress(percentCompleted);
            }
          }
        },
        timeout: 30000, // 30 second timeout for uploads
      });
      
      // Update local mock data to reflect the successful upload
      const docIndex = mockData.documentsChecklist.findIndex(doc => doc.id === documentId);
      if (docIndex >= 0) {
        mockData.documentsChecklist[docIndex] = {
          ...mockData.documentsChecklist[docIndex],
          status: 'completed',
          uploadedDate: new Date().toISOString().split('T')[0],
          fileName: file.name,
          fileSize: file.size
        };
        // Persist to localStorage
        saveChecklist(mockData.documentsChecklist);
      }
      
      return response;
      
    } catch (error) {
      console.error('❌ Document upload failed:', error);
      
      // Handle different types of errors
      if (error.code === 'ECONNABORTED') {
        throw new Error('Upload timeout. Please check your connection and try again.');
      } else if (error.response) {
        // Server responded with error status
        const message = error.response.data?.message || `Upload failed with status ${error.response.status}`;
        throw new Error(message);
      } else if (error.request) {
        // Request was made but no response received
        throw new Error('Network error. Please check your connection and try again.');
      } else {
        // Something else happened
        throw new Error(error.message || 'Upload failed. Please try again.');
      }
    }
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
