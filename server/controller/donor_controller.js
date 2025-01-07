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

// Controller for subscribing to new projects
const subscribeToNewProjects = async (req, res) => {
  try {
    const { donorId, category, region } = req.body;
    const response = await donorService.subscribeToNewProjects(donorId, category, region);
    res.status(200).json(response);  // Respond with success
  } catch (err) {
    res.status(500).send(err.message);  // Error handling
  }
};

// Controller for processing monthly donations
const processMonthlyDonations = async (req, res) => {
  try {
    await donorService.processMonthlyDonations();
    res.status(200).send('Monthly donations processed successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
};

// Controller for fetching top donors of the month
const getTopDonors = async (req, res) => {
  try {
    const topDonors = await donorService.getTopDonors();
    res.status(200).json(topDonors);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  signin_donor,
  subscribeToNewProjects,
  processMonthlyDonations,
  getTopDonors,
};
