// donation_repository.js
import connection from "../lib/db_info.js";  // MySQL connection pool

// Create a new donation record using promise-based query
const createDonation = (donation) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Donation (donor_id, amount, email_id, donation_date)
                   VALUES (?, ?, ?, ?)`;

    connection.query(query, [
      donation.donor_id,
      donation.amount,
      donation.email_id,
      donation.donation_date
    ], (err, results) => {
      if (err) {
        reject(new Error("Failed to create donation: " + err.message));  // Reject on error
      } else {
        resolve(results);  // Resolve with query results
      }
    });
  });
};

// Get donations by donor_id (promise-based query)
const getDonationsByDonor = (donor_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Donation WHERE donor_id = ?`;

    connection.query(query, [donor_id], (err, results) => {
      if (err) {
        reject(new Error("Failed to get donations by donor: " + err.message));  // Reject on error
      } else {
        resolve(results);  // Resolve with query results
      }
    });
  });
};

// Get top donors based on donation amounts for the current month
const getTopDonorsByMonth = () => {
  return new Promise((resolve, reject) => {
    const query = `SELECT donor_id, SUM(amount) AS total_amount
                   FROM Donation
                   WHERE EXTRACT(MONTH FROM donation_date) = EXTRACT(MONTH FROM CURRENT_DATE)
                   GROUP BY donor_id
                   ORDER BY total_amount DESC
                   LIMIT 10`;

    connection.query(query, (err, results) => {
      if (err) {
        reject(new Error("Failed to get top donors for this month: " + err.message));  // Reject on error
      } else {
        resolve(results);  // Resolve with query results
      }
    });
  });
};

export default { createDonation, getDonationsByDonor, getTopDonorsByMonth };
