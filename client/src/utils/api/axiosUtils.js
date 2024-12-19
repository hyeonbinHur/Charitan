import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/panther-charitan/", // 환경변수 사용
  headers: {
    "Content-Type": "application/json",
  },
});
