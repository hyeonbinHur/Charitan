import express from "express";
import api from "../controller/email_controller.js";
const router = express.Router();
/**
 * simple test api for auth
 */

router.post("/send-email", api.send_email);
router.get("/get-email", api.get_email);
router.delete("/delete-email/:email_id", api.delete_email);

export default router;
