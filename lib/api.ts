import axios from 'axios';

export const BASE_API_URL = process.env.NEXT_BACKEND_URL ||"https://terrific-freedom-production.up.railway.app"


export const apiClient = axios.create({
  baseURL: `${BASE_API_URL}`,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});
