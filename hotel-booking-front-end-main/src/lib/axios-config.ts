import axios from "axios";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwtDecode(token);
    // localStorage.setItem()
    const currentTime = Date.now() / 1000;

    if (decoded.exp === undefined) {
      // console.error("Token does not have an expiration time.");
      return true;
    }

    return decoded.exp < currentTime;
  } catch (error) {
    // console.error("Error decoding JWT:", error);
    return true;
  }
};

// Interceptor to attach JWT to request headers
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  // console.log("Inside axios")

  if (token) {
    if (isTokenExpired(token)) {
      // console.log("Token Expired")
      localStorage.removeItem("token");
      window.location.href = "/";
    } else {
      // console.log("Token have not expire")
      config.headers.authorization = `${token}`;
    }
  }

  return config;
});

export default axiosInstance;
