const express = require("express");
const app = express();
const port = process.env.PORT || 3000; // 환경 변수 사용
const projectRouter = require("./routers/project.js");
const charityRouter = require("./routers/charity.js");
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5174",
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
app.use("/panther-charitan", projectRouter, charityRouter);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
