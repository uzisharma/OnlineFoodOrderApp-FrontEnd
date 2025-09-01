import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// =======================
// 🔹 Request Interceptor
// =======================
api.interceptors.request.use(
  (config) => {
    // Grab token from localStorage/sessionStorage (or context)
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// =======================
// 🔹 Response Interceptor
// =======================
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Handle specific status codes globally
      if (error.response.status === 401) {
        console.warn("Unauthorized! Redirecting to login...");
        window.location.href = "/login"; // or navigate with react-router
      }
      if (error.response.status === 403) {
        console.error("Forbidden! You don’t have access.");
      }
    }

    return Promise.reject(error);
  }
);

export default api;
