import connection from "../lib/db_info.js";

// Create a new donor
// Create a new donor
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
        reject(err);  // Reject if error occurs
      } else {
        resolve(results);  // Resolve with the result
      }
    });
  });
};

const findOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Donor WHERE email = ?";
    const values = [email];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
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
        reject(err);  // Reject if error occurs
      } else {
        resolve(results);  // Return results
      }
    });
  });
};

export default {
  findOneByEmail,
  findMonthlyDonors,
};


