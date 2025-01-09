import express from "express";
import projectRouter from "./routers/project.js";
import charityRouter from "./routers/charity.js";
import adminRouter from "./routers/admin.js";
import donorRouter from "./routers/donor.js";
import emailRouter from "./routers/email.js";
import messageRouter from "./routers/message.js";
import deletedShardRouter from "./routers/deleted_shard.js";
import completedShardRouter from "./routers/completed_shard.js";
import languageRouter from "./routers/language.js";
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
app.use(
  "/panther-charitan",
  adminRouter,
  donorRouter,
  projectRouter,
  charityRouter,
  emailRouter,
  messageRouter,
  deletedShardRouter,
  completedShardRouter,
  languageRouter
);

// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
