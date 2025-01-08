// subscription_repository.js
import connection from "../lib/db_info.js";  // MySQL connection pool

// Create a new subscription record using promise-based query
const createSubscription = (subscription) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Subscription (donor_id, category, region, created_at, donation_id)
                   VALUES (?, ?, ?, ?, ?)`;

    connection.query(query, [
      subscription.donor_id,
      subscription.category,
      subscription.region,
      subscription.created_at,
      subscription.donation_id
    ], (err, results) => {
      if (err) {
        reject(new Error("Failed to create subscription: " + err.message));  // Reject on error
      } else {
        resolve(results);  // Resolve with query results
      }
    });
  });
};

export default { createSubscription };
