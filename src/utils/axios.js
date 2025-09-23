import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8080", // Replace with your API base URL
  timeout: 10000, // Request timeout in milliseconds
});

export default instance;