// SubscriptionPage.jsx
import React, { useState, useEffect } from "react";
import { getDonorSubscriptions } from "../utils/api/project";  // Make sure to update the API call as per the backend

const SubscriptionPage = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const donor_id = "1";  // Replace with the actual donor_id, e.g., from user context

  useEffect(() => {
    const fetchSubscriptions = async () => {
      try {
        // Fetch the subscriptions for the donor, sending the donor_id as a parameter in the URL
        const data = await getDonorSubscriptions(donor_id);  // Make sure this API call uses donor_id in the URL
        setSubscriptions(data);
      } catch (error) {
        console.error("Failed to fetch subscriptions", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSubscriptions();
  }, [donor_id]);

  return (
    <section>
      <h2>Your Subscriptions</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {subscriptions.length === 0 ? (
            <p>You have not subscribed to any projects yet.</p>
          ) : (
            <ul>
              {subscriptions.map((sub, index) => (
                <li key={index}>
                  <strong>Category:</strong> {sub.category}
                  <br />
                  <strong>Region:</strong> {sub.region}
                  <br />
                  <strong>Subscribed On:</strong> {new Date(sub.created_at).toLocaleDateString()}
                  <br />
                  <hr />
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
};

export default SubscriptionPage;
