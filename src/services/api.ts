import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import { useAuthStore } from "@/stores/auth";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export const refreshApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

interface RetryableRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

api.interceptors.request.use(
  (config) => {
    const authStore = useAuthStore();

    console.log(" request:", config.method?.toUpperCase(), config.url);
    console.log(" accessTokon:", authStore.accessToken);

    if (authStore.accessToken) {
      config.headers.Authorization = `Bearer ${authStore.accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => {
    console.log("response:", response.config.url, response.status);

    return response;
  },
  async (error: AxiosError) => {
    console.log("ERROR:", error.config?.url, error.response?.status);

    const originalRequest = error.config as RetryableRequestConfig | undefined;

    if (error.response?.status !== 401) return Promise.reject(error);

    console.log("ACCESS TOKEN EXPIRED → REFRESHING...");

    if (!originalRequest?._retry) return Promise.reject(error);

    originalRequest._retry = true;

    const authStore = useAuthStore();

    const result = await authStore.refreshToken();

    console.log("REFRESH RESULT:", result);

    if (!result.success) {
      console.log("refresh token error");
      return Promise.reject(error);
    }

    console.log("retry request", originalRequest.url);

    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`;

    console.log("new access token", result.accessToken);

    return api.request(originalRequest);
  },
);
