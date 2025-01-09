import donationRepository from "../repository/donation_repository.js";

const createDonation = async (req, res) => {
  try {
    console.log("Request body:", req.body);
    console.log("Project ID:", req.params.project_id);
    const donation = {
      project_id: req.params.project_id,
      donor_id: req.body.donor_id || null,
      amount: req.body.amount,
      name: req.body.name,
      message: req.body.message,
      action: req.body.action || "one-time",
      donation_date: new Date(),
    };

    const result = await donationRepository.createDonation(donation);
    console.log("Database result:", result);
    const updatedDonations = await donationRepository.getDonationsByProject(
      req.params.project_id
    );
    res.status(201).json(updatedDonations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateDonation = async (req, res) => {
  try {
    const result = await donationRepository.updateDonation(
      req.params.id,
      req.body
    );
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteDonation = async (req, res) => {
  try {
    await donationRepository.deleteDonation(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDonationsByProject = async (req, res) => {
  try {
    const donations = await donationRepository.getDonationsByProject(
      req.params.project_id
    );
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getDonationsByDonor = async (req, res) => {
  try {
    const donations = await donationRepository.getDonationsByDonor(
      req.params.donor_id
    );
    res.json(donations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getTopDonorsByMonth = async (req, res) => {
  try {
    const topDonors = await donationRepository.getTopDonorsByMonth();
    res.json(topDonors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export default {
  createDonation,
  updateDonation,
  deleteDonation,
  getDonationsByProject,
  getDonationsByDonor,
  getTopDonorsByMonth,
};
