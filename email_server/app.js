import express from "express";
import cors from "cors";

const app = express();
const port = 3001;

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
// 기본 경로
app.get("/", (req, res) => {
  res.send("Welcome to the Panther Charitan API!");
});
// 라우터
app.use("/panther-charitan");
// 서버 실행
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
