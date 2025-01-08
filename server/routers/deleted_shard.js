import express from "express";
import api from "../controller/deleted_shard_controller.js";
const router = express.Router();
router.post("/shard/deleted", api.create_deleted_project);
router.get("/shard/deleted", api.read_deleted_projects);
export default router;
