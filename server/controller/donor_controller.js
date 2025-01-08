import donorService from "../service/donor_service.js";

const signin_donor = async (req, res) => {
  // set cache
  try {
    const { email } = req.body;
    const user = await donorService.signInUser(email);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Subscribe a donor to a new project
const subscribeToNewProjects = async (req, res) => {
  try {
    const { donorId, category, region, donationId } = req.body;

    if (!donorId || !category || !region || !donationId) {
      return res.status(400).json({
        message: "Donor ID, category, region, and donation ID are required.",
      });
    }

    // Subscribe the donor using the service layer
    const result = await donorService.subscribeToNewProjects(
      donorId,
      category,
      region,
      donationId
    );
    res.status(200).json({ message: "Subscription successful.", data: result });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Process monthly donations
const processMonthlyDonations = async (req, res) => {
  try {
    const response = await donorService.processMonthlyDonations();
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
  processMonthlyDonations,
  getTopDonors,
};
