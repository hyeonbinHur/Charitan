import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_URL, // 환경변수 사용
  headers: {
    "Content-Type": "application/json",
  },
});
