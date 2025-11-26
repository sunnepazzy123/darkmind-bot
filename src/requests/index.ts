import axios, { AxiosInstance, } from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

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

function extractToken(params?: Record<string, any>) {
  if (!params) return { token: null, rest: {} };

  const { token, ...rest } = params;
  return { token, rest };
}

// GET helper
export async function apiGet<T = any>(
  path: string,
  params: Record<string, any> = {}
) {
  const { token, rest } = extractToken(params);

  const res = await api.get<T>(path, {
    params: rest,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });

  return res.data;
}

// POST helper
export async function apiPost<T = any>(
  path: string,
  body?: unknown,
  params: Record<string, any> = {}
) {
  const { token, rest } = extractToken(params);
  const res = await api.post<T>(path, body, {
    params: rest,
    headers: token ? { Authorization: `Bearer ${token}` } : undefined,
  });
  return res.data;
}

export default api;


