import axios from "axios";

export const axiosEmailInstance = axios.create({
  baseURL: import.meta.env.VITE_PUBLIC_EMAIL_URL, // 환경변수 사용
  headers: {
    "Content-Type": "application/json",
  },
});
