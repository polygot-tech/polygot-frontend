import axios from 'axios';

const dev = false

export const BASE_API_URL = dev?"http://localhost:3001":(process.env.NEXT_BACKEND_URL || "https://api.polygot.tech")


export const apiClient = axios.create({
  baseURL: `${BASE_API_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
