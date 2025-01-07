import express from "express";
import api from "../controller/email_controller.js";
const router = express.Router();
/**
 * simple test api for auth
 */

router.post("/send-email", api.send_email);

export default router;
