import express from "express";
import api from "../controller/message_controller.js";
const router = express.Router();
router.post("/message", api.create_message);
router.delete("/message/:messageId", api.delete_message);
router.post("/message/:projectId", api.read_message);
//create message
//delete message
//read certain project message
export default router;
