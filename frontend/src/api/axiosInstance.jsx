import axios from "axios";
import { useAuthStore } from "../store/authStore";
import { PUBLIC_ROUTES_PATTERN } from "./publicRoute";
const API_URL =
  import.meta.env.VITE_REACT_APP_BACKEND_BASEURL ||
  "http://127.0.0.1:8000/api/";

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use((config) => {
  const token = useAuthStore.getState().accessToken;
  console.log("axiosInstance token:", token);
  const base = config.baseURL.endsWith("/")
    ? config.baseURL
    : config.baseURL + "/";
  const relativeUrl = config.url.replace(base, "");
  const isPublic = PUBLIC_ROUTES_PATTERN.some((route) =>
    relativeUrl.startsWith(route)
  );
  // ✅ Attach token only if route is NOT public
  if (token && !isPublic) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosInstance;
