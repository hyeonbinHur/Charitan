const express = require("express");
const app = express();
const port = 3000;
const router = express.Router();
const projectRouter = require("./routers/project.js");

app.use("/panther-charitan/", projectRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
