import axios, { AxiosError, type AxiosInstance } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "/";
const requestTimeoutMs = 15_000;

export const httpClient: AxiosInstance = axios.create({
  baseURL,
  timeout: requestTimeoutMs,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("auth_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (process.env.NODE_ENV !== "production") {
      const status = error.response?.status ?? "NO_STATUS";
      const method = error.config?.method?.toUpperCase() ?? "UNKNOWN_METHOD";
      const url = error.config?.url ?? "UNKNOWN_URL";
      // eslint-disable-next-line no-console
      console.error(`[API ERROR] ${method} ${url} -> ${status}`);
    }

    return Promise.reject(error);
  },
);
