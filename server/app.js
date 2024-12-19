const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // 환경 변수 사용
const projectRouter = require("./routers/project.js");

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
