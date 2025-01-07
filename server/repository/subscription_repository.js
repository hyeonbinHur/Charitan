// subscription_repository.js
import db from "../lib/db_info.js";

const createSubscription = async (subscription) => {
  try {
    const query = `INSERT INTO subscriptions (donorId, category, region, subscribedAt)
                   VALUES ($1, $2, $3, $4)`;
    await db.query(query, [subscription.donorId, subscription.category, subscription.region, subscription.subscribedAt]);
  } catch (err) {
    throw new Error("Failed to create subscription: " + err.message);
  }
};

export default { createSubscription };
