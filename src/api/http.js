// src/api/http.js
import axios from "axios";

const RAW = import.meta.env.VITE_API_URL || "";
const BASE_URL = RAW.replace(/\/+$/, ""); 

const http = axios.create({
  baseURL: BASE_URL, 
  timeout: 20000,
  headers: { "Content-Type": "application/json" },
});


http.interceptors.response.use(
  (res) => res,
  (err) => {
    const status = err?.response?.status;
    const data = err?.response?.data;
    const message =
      data?.message ||
      err?.message ||
      `Request failed${status ? ` (${status})` : ""}`;

    const e = new Error(message);
    e.status = status;
    e.data = data;
    throw e;
  }
);

export default http;
