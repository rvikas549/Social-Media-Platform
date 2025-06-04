// src/lib/axios.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true, // for cookies if used
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
