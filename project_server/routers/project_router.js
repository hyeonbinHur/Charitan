import express from "express";
import api from "../controller/project_controller.js";

const router = express.Router();
router.get("/project", api.get_projects); //read all posts with titles
router.get("/project/:id", api.get_project); // read a specific post
router.get("/project/search/status", api.get_projects_by_status);
router.get("/project/user/:id", api.get_projects_by_charity); // read all posts which written by an user
router.post("/project", api.create_project); // create new post
router.put("/project/:id", api.update_project); // update post
router.delete("/project/:id", api.delete_project); // delete post

export default router;
