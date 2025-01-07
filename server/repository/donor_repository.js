import connection from "../lib/db_info.js";

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
const findMonthlyDonors = async () => {
  try {
    const query = `SELECT donorId, monthlyDonationAmount
                   FROM donors
                   WHERE monthlyDonationAmount > 0`;  // Assuming donors with a set monthly amount are opted in
    const result = await connection .query(query);
    return result.rows;
  } catch (err) {
    throw new Error("Failed to find monthly donors: " + err.message);
  }
};

export default {
  findOneByEmail,
  findMonthlyDonors,
};


