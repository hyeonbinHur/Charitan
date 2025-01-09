import express from "express";
import api from "../controller/language_controller.js";
const router = express.Router();
router.get("/language", api.get_language);
export default router;
