import express from "express";
import api from "../controller/admin_controller.js";
const router = express.Router();
/**
 * simple test api for auth
 */

router.post("/signin/admin", api.signin_admin);

export default router;
