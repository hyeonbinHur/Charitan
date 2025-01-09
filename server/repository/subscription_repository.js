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

// Find subscription by donor ID
const findSubscriptionByDonor = (donor_id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Subscription WHERE donor_id = ?";
    connection.query(query, [donor_id], (err, result) => {
      if (err) {
        reject(new Error("Failed to find subscription: " + err.message));  // Reject on error
      } else {
        resolve(result.length > 0 ? result[0] : null);  // Resolve with query result if no error
      }
    });
  });
};

// Cancel a subscription
const cancelSubscription = (donor_id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Subscription WHERE donor_id = ?";
    connection.query(query, [donor_id], (err, result) => {
      if (err) {
        reject(new Error("Failed to cancel subscription: " + err.message));  // Reject on error
      } else if (result.affectedRows === 0) {
        reject(new Error("No active subscription found for this donor."));  // Reject if no rows affected
      } else {
        resolve({ message: "Subscription cancelled successfully." });  // Resolve with success message
      }
    });
  });
};



export default { createSubscription,findSubscriptionByDonor, cancelSubscription};
