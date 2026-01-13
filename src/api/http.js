// src/api/http.js
import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const http = axios.create({
  baseURL: API,              // e.g. http://localhost:3000
  withCredentials: true,
});

// optional: nice error message
http.interceptors.response.use(
  (res) => res,
  (err) => {
    const msg =
      err?.response?.data?.message ||
      err?.message ||
      "Request failed";
    return Promise.reject(new Error(msg));
  }
);

export default http;
