import express from "express";
import api from "../controller/donor_controller.js";
const router = express.Router();

router.post("/signin/donor", api.signin_donor);

// Route for subscribing to new projects
router.post('/subscribe/donor', api.subscribeToNewProjects);

// Route for processing monthly donations
router.post('/monthly-donation/donor', api.processMonthlyDonations);

// Route for fetching top donors of the month
router.get('/top-donors/donor', api.getTopDonors);


export default router;
