// donation_repository.js

import db from "../lib/db_info.js";

// Create a new donation record
const createDonation = async (donation) => {
  try {
    const query = `INSERT INTO donations (donorId, amount, donationDate)
                   VALUES ($1, $2, $3)`;
    await db.query(query, [donation.donorId, donation.amount, donation.donationDate]);
  } catch (err) {
    throw new Error("Failed to create donation: " + err.message);
  }
};

// Get top donors of the month based on total donation amount
const getTopDonorsByMonth = async () => {
  try {
    const query = `SELECT donorId, SUM(amount) AS totalAmount
                   FROM donations
                   WHERE EXTRACT(MONTH FROM donationDate) = EXTRACT(MONTH FROM CURRENT_DATE)
                   GROUP BY donorId
                   ORDER BY totalAmount DESC
                   LIMIT 10`;  // Fetch top 10 donors
    const result = await db.query(query);
    return result.rows;  // Return the top donors
  } catch (err) {
    throw new Error("Failed to fetch top donors: " + err.message);
  }
};

export default { createDonation, getTopDonorsByMonth };
