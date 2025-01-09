// donation_repository.js
import connection from "../lib/db_info.js"; // MySQL connection pool

// Create a new donation record using promise-based query
// donation_repository.js
const createDonation = (donation) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Donation (donation_id, project_id, donor_id, name, amount, message, action, donation_date)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(
      query,
      [
        donation.donation_id,
        donation.project_id,
        donation.donor_id,
        donation.name,
        donation.amount,
        donation.message,
        donation.action,
        donation.donation_date,
      ],
      (err, results) => {
        if (err) {
          reject(new Error("Failed to create donation: " + err.message));
        } else {
          resolve(results);
        }
      }
    );
  });
};
// Get donations by donor_id (promise-based query)
const getDonationsByDonor = (donor_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT d.*, p.title as project_title 
                    FROM Donation d
                    JOIN Project p ON d.project_id = p.project_id 
                    WHERE d.donor_id = ?`;

    connection.query(query, [donor_id], (err, results) => {
      if (err) {
        reject(new Error("Failed to get donations by donor: " + err.message)); // Reject on error
      } else {
        resolve(results); // Resolve with query results
      }
    });
  });
};
const getDonationsByProject = (project_id) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM Donation WHERE project_id = ?`;
    connection.query(query, [project_id], (err, results) => {
      if (err) {
        reject(new Error("Failed to get donations by project: " + err.message));
      } else {
        resolve(results);
      }
    });
  });
};
// Get top donors based on donation amounts for the current month
const getTopDonorsByMonth = () => {
  return new Promise((resolve, reject) => {
<<<<<<< HEAD
    const query = `SELECT donor_id, project_id, SUM(amount) AS total_amount
                   FROM Donation
                   WHERE EXTRACT(MONTH FROM donation_date) = EXTRACT(MONTH FROM CURRENT_DATE)
                   GROUP BY donor_id, project_id
                   ORDER BY total_amount DESC
                   LIMIT 10`;
=======
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
>>>>>>> main

    connection.query(query, (err, results) => {
      if (err) {
        reject(
          new Error("Failed to get top donors for this month: " + err.message)
        ); // Reject on error
      } else {
<<<<<<< HEAD
        resolve(results); // Resolve with query results
=======
        resolve(results);  // Resolve with the query results
>>>>>>> main
      }
    });
  });
};

const deleteDonation = (id) => {
  return new Promise((resolve, reject) => {
    const query = `DELETE FROM Donation WHERE donation_id = ?`;
    connection.query(query, [id], (err, results) => {
      if (err) {
        reject(new Error("Failed to delete donation: " + err.message));
      } else {
        resolve(results);
      }
    });
  });
};

export default {
  createDonation,
  getDonationsByProject,
  getDonationsByDonor,
  getTopDonorsByMonth,
  deleteDonation,
};
