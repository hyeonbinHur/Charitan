import React, { useState, useEffect } from "react";

function DonationPage() {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({
    name: "",
    amount: 0,
    message: "",
    action: " ",
  });
  const [editingDonation, setEditingDonation] = useState(null);

  // Fetch initial donations (replace with your actual API call)
  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch("/api/donations");
        const data = await response.json();
        setDonations(data);
      } catch (error) {
        console.error("Error fetching donations:", error);
      }
    };

    fetchDonations();
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
  };

  // Create a new donation
  const handleCreate = async () => {
    try {
      const response = await fetch("/api/donations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDonation),
      });
      const data = await response.json();
      setDonations(data);
      setNewDonation({ name: "", amount: 0, message: "", action: "" });
    } catch (error) {
      console.error("Error creating donation:", error);
    }
  };

  // Update an existing donation
  const handleUpdate = async (id) => {
    try {
      const response = await fetch(`/api/donations/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editingDonation),
      });
      const data = await response.json();
      setDonations(donations.map((d) => (d.id === id ? data : d)));
      setEditingDonation(null);
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  };

  // Delete a donation
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/donations/${id}`, { method: "DELETE" });
      setDonations(donations.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  return (
    <div className="donation-page p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Donation Page</h1>

      <div className="form-container w-96 p-6 border border-gray-300 rounded-md mb-6">
        <h2 className="text-xl font-semibold text-center mb-4">
          {editingDonation ? "Edit Donation" : "Add Donation"}
        </h2>
        <div className="form-field mb-4">
          <label htmlFor="name" className="block mb-2">
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={editingDonation ? editingDonation.name : newDonation.name}
            onChange={
              editingDonation
                ? (e) =>
                    setEditingDonation({
                      ...editingDonation,
                      name: e.target.value,
                    })
                : handleChange // Use handleChange for the "Add Donation" form
            }
          />
        </div>
        <div className="form-field mb-4">
          {/* Amount field */}
          <label htmlFor="amount" className="block mb-2">
            Amount:
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            placeholder="Amount"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={
              editingDonation ? editingDonation.amount : newDonation.amount
            }
            onChange={
              editingDonation
                ? (e) =>
                    setEditingDonation({
                      ...editingDonation,
                      amount: parseInt(e.target.value, 10),
                    })
                : handleChange // Use handleChange for the "Add Donation" form
            }
          />
        </div>
        <div className="form-field mb-4">
          {/* Message field */}
          <label htmlFor="message" className="block mb-2">
            Message:
          </label>
          <textarea
            id="message"
            name="message"
            placeholder="Message"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={
              editingDonation ? editingDonation.message : newDonation.message
            }
            onChange={
              editingDonation
                ? (e) =>
                    setEditingDonation({
                      ...editingDonation,
                      message: e.target.value,
                    })
                : handleChange // Use handleChange for the "Add Donation" form
            }
          />
        </div>

        <div className="form-field mb-4">
          {" "}
          {/* Action field */}
          <label htmlFor="action" className="block mb-2">
            Action:
          </label>
          <select
            id="action"
            name="action"
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={
              editingDonation ? editingDonation.action : newDonation.action
            }
            onChange={
              editingDonation
                ? (e) =>
                    setEditingDonation({
                      ...editingDonation,
                      action: e.target.value,
                    })
                : handleChange
            }
          >
            <option value="">Select an action</option>
            <option value="volunteer">Volunteer</option>
            <option value="donate">Donate</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-buttons flex justify-around mt-6">
          {editingDonation ? (
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleUpdate(editingDonation.id)}
            >
              Update
            </button>
          ) : (
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleCreate}
            >
              Add
            </button>
          )}
          {editingDonation && (
            <button
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => setEditingDonation(null)}
            >
              Cancel
            </button>
          )}
        </div>
      </div>

      <div className="table-container overflow-x-auto">
        <table className="donation-table w-full border-collapse">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Name</th>
              <th className="border border-gray-300 px-4 py-2">Amount</th>
              <th className="border border-gray-300 px-4 py-2">Message</th>
              <th className="border border-gray-300 px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id}>
                <td className="border border-gray-300 px-4 py-2">
                  {donation.name}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {donation.amount}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {donation.message}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {donation.action}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  <button
                    className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-2 rounded mr-2"
                    onClick={() => setEditingDonation(donation)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                    onClick={() => handleDelete(donation.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DonationPage;
