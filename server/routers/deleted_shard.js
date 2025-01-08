import express from "express";
import api from "../controller/deleted_shard_controller.js";
const router = express.Router();
router.post("/shard/delete", api.create_deleted_project);
router.get("/shard/delete", api.read_deleted_projects);
export default router;
