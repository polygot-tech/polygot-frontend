/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiClient } from "@/lib/api";
import { useAuthStore } from "@/store/auth.store";


apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.error("Axios response error:", error);

    return Promise.reject(error);
  }
);


export const checkApiKey = async (email: string) => { 
    try {
        const res = await apiClient.post("/api/v1/keys/check-api-key", { email });

        return res.data.api_key;
    } catch (error:any) {
        console.error("Error checking API key:", error.response ? error.response.data : error.message);
        return null;
    }
};

export const createApiKey = async (email: string, password: string) => {
    try {
        const res = await apiClient.post("/api/v1/keys/create-api-key", { email, password });

        return res.data;
    } catch (error:any) {
        console.error("Error creating API key:", error.response ? error.response.data : error.message);
        return null;
    }
};

export const getApiKey = async (email: string, password: string) => {
    try {
        const res = await apiClient.post("/api/v1/keys/get-api-key", { email, password });

        return res.data;
    } catch (error:any) {
        console.error("Error getting API key:", error.response ? error.response.data : error.message);
        return null;
    }
};