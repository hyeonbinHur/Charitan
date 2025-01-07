// donor_service.js
import donorRepository from "../repository/donor_repository.js";   // For donor operations
import donationRepository from "../repository/donation_repository.js"; // For donation records
import subscriptionRepository from "../repository/subscription_repository.js"; // For subscription management


/**
 * sample auth api
 */
const signInUser = async (email) => {
  try {
    console.log(email);
    const user = await donorRepository.findOneByEmail(email);
    // await setUser(user[0].user_id, user[0].user_name);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

// Subscribe donor to new projects based on category and region
const subscribeToNewProjects = async (donorId, category, region) => {
  try {
    const subscription = {
      donorId,
      category,
      region,
      subscribedAt: new Date(),  // Timestamp for when the subscription occurs
    };
    await subscriptionRepository.createSubscription(subscription);  // Save subscription in database
    return { message: 'Subscription successful' };
  } catch (err) {
    throw new Error("Failed to subscribe to projects: " + err.message);
  }
};

// Process monthly donations for donors
const processMonthlyDonations = async () => {
  try {
    const monthlyDonors = await donorRepository.findMonthlyDonors();
    for (const donor of monthlyDonors) {
      const donationAmount = donor.monthlyDonationAmount;
      await donationRepository.createDonation({
        donorId: donor.donorId,
        amount: donationAmount,
        donationDate: new Date(),
      });
    }
  } catch (err) {
    throw new Error("Failed to process monthly donations: " + err.message);
  }
};



const getTopDonors = async () => {
  try {
    const topDonors = await donationRepository.getTopDonorsByMonth();  // Get top donors by donation amount
    return topDonors;
  } catch (err) {
    throw new Error("Failed to fetch top donors: " + err.message);
  }
};




export default { signInUser, subscribeToNewProjects, processMonthlyDonations, getTopDonors };
