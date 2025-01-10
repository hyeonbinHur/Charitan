import express from "express";
import api from "../controller/donor_controller.js";
const router = express.Router();

router.post("/signin/donor", api.signin_donor);

// Route for subscribing to new projects
router.post('/subscribe/donor', api.subscribeToNewProjects);

// Route for processing monthly donations
router.post('/monthly-donation/donor', api.processMonthlyDonation);

// Route for fetching top donors of the month
router.get('/top-donors/donor', api.getTopDonors);

router.post("/cancel-monthly-donation/donor", api.cancelMonthlyDonation);

router.get("/subscriptions/:donor_id", api.getDonorSubscriptions);  // Using donor_id as a parameter in the URL




export default router;
