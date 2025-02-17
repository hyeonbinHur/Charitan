import express from "express";
import projectRouter from "./routers/project_router.js";
import cors from "cors";

const app = express();
const port = process.env.PORT || 3000; // 환경 변수 사용

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
// 미들웨어
app.use(express.json());

// 기본 경로
app.get("/", (req, res) => {
  res.send("Welcome to the Panther Charitan API!");
});

// 라우터
app.use("/panther-charitan", projectRouter);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
