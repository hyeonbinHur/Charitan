// donor_repository.js
import connection from "../lib/db_info.js";  // MySQL connection pool

// Create a new donor record using promise-based query
const createDonor = (donor) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Donor (total_donations, donation_count, password, phone_number, address, avatar, created_at, updated_at, name, paymentDetail, donor_type, introduction_video, email_verified, email)
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    connection.query(query, [
      donor.total_donations,
      donor.donation_count,
      donor.password,
      donor.phone_number,
      donor.address,
      donor.avatar,
      donor.created_at,
      donor.updated_at,
      donor.name,
      donor.paymentDetail,
      donor.donor_type,
      donor.introduction_video,
      donor.email_verified,
      donor.email,
    ], (err, results) => {
      if (err) {
        reject(new Error("Failed to create donor: " + err.message));  // Reject on error
      } else {
        resolve(results);  // Resolve with query results
      }
    });
  });
};

const updateMonthlyDonation = (donorId, isMonthly) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Donor SET is_monthly_donation = ? WHERE donor_id = ?`;
    const values = [isMonthly, donorId];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Find donor by email
const findOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Donor WHERE email = ?";
    const values = [email];

    connection.query(query, values, (err, results) => {
      if (err) {
        reject(new Error("Failed to find donor by email: " + err.message));  // Reject on error
      } else {
        resolve(results);  // Resolve with query results
      }
    });
  });
};

// Find donor by ID
const findDonorById = (donor_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Donor WHERE donor_id = ?";
    connection.query(query, [donor_id], (err, result) => {
      if (err) {
        reject(new Error("Failed to find donor: " + err.message));
      } else {
        resolve(result[0]);  // Return the donor's data
      }
    });
  });
};

// Find donors who have opted for monthly donations
const findMonthlyDonors = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT donor_id, total_donations, donation_count FROM Donor WHERE total_donations > 0";

    connection.query(query, (err, results) => {
      if (err) {
        reject(new Error("Failed to find monthly donors: " + err.message));  // Reject on error
      } else {
        resolve(results);  // Resolve with query results
      }
    });
  });
};


// Cancel Monthly Donation
const cancelMonthlyDonation = (donor_id) => {
  return new Promise((resolve, reject) => {
    // Find if the donor has an active monthly donation subscription
    subscriptionRepository.findSubscriptionByDonor(donor_id)
      .then((subscription) => {
        if (!subscription) {
          return reject(new Error("No active subscription found for this donor."));
        }

        // Now remove the subscription from the Subscription table (or mark as canceled)
        const query = "DELETE FROM Subscription WHERE donor_id = ?";
        connection.query(query, [donor_id], (err, result) => {
          if (err) {
            reject(new Error("Failed to cancel subscription: " + err.message));
          } else if (result.affectedRows === 0) {
            reject(new Error("No active subscription found for this donor."));
          } else {
            resolve({ message: "Monthly donation subscription cancelled successfully." });
          }
        });
      })
      .catch((err) => reject(new Error("Failed to find subscription: " + err.message)));
  });
};

export default {
  findOneByEmail,
  findDonorById,
  updateMonthlyDonation,
  findMonthlyDonors,
  cancelMonthlyDonation,
  createDonor
};
