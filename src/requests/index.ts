import axios, { AxiosInstance, } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

const api: AxiosInstance = axios.create({
    baseURL: API_BASE,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
    },
      withCredentials: true, // ✅ required for cookies
});

api.interceptors.response.use(
    (resp) => resp,
    (error) => {
        // normalize error shape
        const err = error?.response?.data ?? { message: error.message ?? "Unknown error" };
        return Promise.reject(err);
    }
);

// GET helper
export async function apiGet<T = any>(
  path: string,
  params?: Record<string, any>
) {
  const res = await api.get<T>(path, {
    params,
    headers: params?.token ? { Authorization: `Bearer ${params.token}` } : undefined,
  });
  return res.data;
}

// POST helper
export async function apiPost<T = any>(
  path: string,
  body?: unknown,
  params?: Record<string, any>
) {
  const res = await api.post<T>(path, body, {
    params,
    headers: params?.token ? { Authorization: `Bearer ${params.token}` } : undefined,
  });
  return res.data;
}

export default api;


