import express from "express";
import api from "../controller/donation_controller.js";

const router = express.Router();

router.get("/donations/project/:project_id", api.getDonationsByProject);
router.post("/donations/project/:project_id", api.createDonation);
router.put("/donations/:id", api.updateDonation);
router.delete("/donations/:id", api.deleteDonation);
router.get("/donations/donor/:donor_id", api.getDonationsByDonor);
router.get("/donations/top/month", api.getTopDonorsByMonth);

export default router;
