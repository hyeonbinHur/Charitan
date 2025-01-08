// subscription_repository.js
import connection from "../lib/db_info.js";  // MySQL connection

// Create a new subscription record using promise-based query
const createSubscription = (subscription) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO Subscription (donor_id, category, region, created_at, donation_id)
                   VALUES (?, ?, ?, ?, ?)`;

    connection.query(query, [
      subscription.donorId,
      subscription.category,
      subscription.region,
      subscription.created_at,
      subscription.donationId
    ])
    .then(([results]) => {
      resolve(results);  // Resolving the promise with query results
    })
    .catch((err) => {
      reject(new Error("Failed to create subscription: " + err.message));  // Rejecting on error
    });
  });
};

export default { createSubscription };
