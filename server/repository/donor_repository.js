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

export default {
  findOneByEmail,
};
