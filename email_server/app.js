// @ts-nocheck
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import emailRouter from "./router/email_router.js";
// 환경 변수 로드
dotenv.config();
const app = express();
const port = 3001;
// Middleware 설정
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use("/panther-charitan", emailRouter);
// 기본 경로
app.get("/", (req, res) => {
  res.send("Welcome to the Panther Charitan API!");
});
// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
