const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

// MySQL 연결 설정
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// MySQL 연결 테스트
db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

// 라우터 정의
const router = express.Router();

router.get("/tests", (req, res) => {
  db.query("SELECT * FROM test", (err, results) => {
    if (err) {
      console.error("Error executing query:", err);
      res.status(500).send("Failed to retrieve data");
    } else {
      res.json(results);
    }
  });
});

// 라우터를 앱에 연결
app.use("/", router);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// 서버 실행
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
