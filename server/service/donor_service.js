// donor_service.js
import donorRepository from "../repository/donor_repository.js";   // For donor operations
import donationRepository from "../repository/donation_repository.js"; // For donation records
import subscriptionRepository from "../repository/subscription_repository.js"; // For subscription management


/**
 * sample auth api
 */
const signInUser = async (email) => {
  try {
    const user = await donorRepository.findOneByEmail(email);
    // await setUser(user[0].user_id, user[0].user_name);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

// Subscribe a donor to a new project
const subscribeToNewProjects = async (donorId, category, region, donationId) => {
  try {
    // Ensure the donation exists for the donor
    const [donations] = await donationRepository.getDonationsByDonor(donorId);

    if (!donations || donations.length === 0) {
      throw new Error("No donation found for this donor.");
    }

    // Create subscription if valid donation exists
    const subscription = {
      donorId,
      category,
      region,
      created_at: new Date(),
      donationId,  // Use the donation_id from the Donation table
    };

    const result = await subscriptionRepository.createSubscription(subscription);
    return result;  // Return the result of the subscription creation
  } catch (err) {
    console.error(err)
    throw new Error("Error subscribing to project: " + err.message);
  }
};

// Process monthly donations for all donors who have opted in
const processMonthlyDonations = async () => {
  try {
    // Fetch all donors who have made donations
    const [monthlyDonors] = await donationRepository.getTopDonorsByMonth();

    for (const donor of monthlyDonors) {
      const donationAmount = donor.total_amount;
      await donationRepository.createDonation({
        donor_id: donor.donor_id,
        amount: donationAmount,
        email_id: donor.email_id,
        donation_date: new Date(),
      });
    }

    return { message: 'Monthly donations processed successfully.' };
  } catch (err) {
    throw new Error("Failed to process monthly donations: " + err.message);
  }
};

// Get top donors of the current month
const getTopDonors = async () => {
  try {
    const [topDonors] = await donationRepository.getTopDonorsByMonth();
    return topDonors;
  } catch (err) {
    throw new Error("Failed to fetch top donors: " + err.message);
  }
};

export default { signInUser, subscribeToNewProjects, processMonthlyDonations, getTopDonors };
