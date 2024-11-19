const express = require("express");
const mysql = require("mysql2");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const port = 3000;

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err.stack);
    return;
  }
  console.log("Connected to MySQL database.");
});

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

app.use("/", router);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
