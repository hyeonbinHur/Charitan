const express = require("express");
const router = express.Router();
const api = require("../handler/project-handler.js");

router.get("/project", api.get_projects); //read all posts with titles
router.get("/project/:id", api.get_project); // read a specific post
router.get("/project/user/:id", api.get_projects_by_charity); // read all posts which written by an user
router.post("/project", api.create_project); // create new post
router.put("/project/:id", api.update_project); // update post
router.delete("/project/:id", api.delete_project); // delete post

module.exports = router;
