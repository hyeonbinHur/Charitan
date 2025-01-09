import donorService from "../service/donor_service.js";
import dotenv from "dotenv";
dotenv.config();

const signin_donor = async (req, res) => {
  // set cache
  console.log(process.env.DB_HOST);
  try {
    const { email } = req.body;
    const user = await donorService.signInUser(email);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Subscribe a donor to a new project with category and region preferences
const subscribeToNewProjects = async (req, res) => {
  try {
    const { donor_id, category, region, donation_id } = req.body;

    if (!donor_id || !category || !region || !donation_id) {
      return res.status(400).json({
        message: "Donor ID, category, region, and donation ID are required.",
      });
    }

    // Subscribe the donor using the service layer
    const result = await donorService.subscribeToNewProjects(donor_id, category, region, donation_id);
    res.status(200).json({ message: "Subscription successful.", data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// Process monthly donations
// Process monthly donations
const processMonthlyDonation = async (req, res) => {
  try {
    const response = await donorService.processMonthlyDonations();
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Cancel Monthly Donation
const cancelMonthlyDonation = async (req, res) => {
  try {
    const { donor_id } = req.body;

    if (!donor_id) {
      return res.status(400).json({
        message: "Donor ID is required to cancel the monthly donation.",
      });
    }

    const response = await donorService.cancelMonthlyDonation(donor_id);
    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};


// Get top donors for the current month
const getTopDonors = async (req, res) => {
  try {
    const topDonors = await donorService.getTopDonors();
    res.status(200).json(topDonors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export default {
  signin_donor,
  subscribeToNewProjects,
  processMonthlyDonation,
  getTopDonors,
  cancelMonthlyDonation
};
