const mysql = require("mysql2");
const dotenv = require("dotenv");
const db_info = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

const connection = mysql.createConnection(db_info);
module.exports = connection;
