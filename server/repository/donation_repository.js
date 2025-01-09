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
    const query = `
      SELECT D.donor_id, D.name, D.avatar, SUM(Do.amount) AS total_donations
      FROM Donation Do
      JOIN Donor D ON D.donor_id = Do.donor_id
      WHERE EXTRACT(MONTH FROM Do.donation_date) = EXTRACT(MONTH FROM CURRENT_DATE())
      AND EXTRACT(YEAR FROM Do.donation_date) = EXTRACT(YEAR FROM CURRENT_DATE())
      GROUP BY D.donor_id
      ORDER BY total_donations DESC
      LIMIT 10
    `;

    connection.query(query, (err, results) => {
      if (err) {
        reject(new Error("Failed to get top donors for this month: " + err.message));  // Reject on error
      } else {
        resolve(results);  // Resolve with the query results
      }
    });
  });
};

export default { createDonation, getDonationsByDonor, getTopDonorsByMonth };
