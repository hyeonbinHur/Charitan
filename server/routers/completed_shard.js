import express from "express";
import api from "../controller/completed_shard_controller.js";
const router = express.Router();
router.post("/shard/completed", api.create_completed_project);
router.get("/shard/completed", api.read_completed_projects);
export default router;
