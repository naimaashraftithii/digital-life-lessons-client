// src/api/client.js
export async function apiFetch(path, options = {}, config = {}) {
  const RAW = import.meta.env.VITE_API_URL || "";
  const API = RAW.replace(/\/+$/, "");
  const finalPath = path.startsWith("/") ? path : `/${path}`;
  const url = `${API}${finalPath}`;

  const res = await fetch(url, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  if (config.allow404 && res.status === 404) {
    return config.defaultValue ?? null;
  }

  const text = await res.text();
  let data = null;
  try { data = text ? JSON.parse(text) : null; }
  catch { data = text; }

  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}



const RAW = import.meta.env.VITE_API_URL || "";
const API = RAW.replace(/\/+$/, "");

export class ApiError extends Error {
  constructor(message, status, data, url) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.data = data;
    this.url = url;
  }
}


