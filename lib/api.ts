import { useAuthStore } from "@/store/auth.store";
import axios from "axios";

const dev = false;

export const BASE_API_URL = dev
  ? "http://localhost:3000"
  : process.env.NEXT_BACKEND_URL || "https://api.polygot.tech";

export const apiClient = axios.create({
  baseURL: `${BASE_API_URL}`,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

apiClient.interceptors.request.use((config) => {
  config.headers["Authorization"] = `Bearer ${useAuthStore.getState().token}`;
  return config;
});
