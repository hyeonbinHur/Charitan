import express from "express";
import api from "../controller/donor_controller.js";
const router = express.Router();
router.post("/signin/donor", api.signin_donor);
export default router;
