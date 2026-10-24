// src/api/client.ts
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { API_BASE_URL } from "@/config/api";

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
let refreshing: Promise<void> | null = null;

function refreshToken(): Promise<void> {
  refreshing ??= apiClient
    .post("/auth/refresh")
    .then(() => undefined)
    .finally(() => {
      refreshing = null;
    });
  return refreshing;
}

type RetryConfig = InternalAxiosRequestConfig & { _retry?: boolean };

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const original = error.config as RetryConfig | undefined;
    const isExpired =
      error.response?.status === 401 &&
      error.response.headers["token-expired"] === "true";

    if (
      !original ||
      !isExpired ||
      original._retry ||
      original.url?.includes("/auth/refresh")
    ) {
      return Promise.reject(error);
    }

    original._retry = true;
    try {
      await refreshToken();
    } catch {
      window.location.href = "/login";
      return Promise.reject(error);
    }

    return apiClient(original);
  },
);

export default apiClient;
