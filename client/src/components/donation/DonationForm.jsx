import React from "react";

const DonationForm = ({
  newDonation,
  editingDonation,
  handleChange,
  handleCreate,
  handleUpdate,
  setEditingDonation,
}) => {
  return (
    <form className="flex flex-col gap-4">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="border p-2 rounded w-full"
          value={editingDonation ? editingDonation.name : newDonation.name}
          onChange={
            editingDonation
              ? (e) => setEditingDonation({ ...editingDonation, name: e.target.value })
              : handleChange
          }
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          name="amount"
          placeholder="Amount"
          className="border p-2 rounded w-full"
          value={editingDonation ? editingDonation.amount : newDonation.amount}
          onChange={
            editingDonation
              ? (e) =>
                  setEditingDonation({
                    ...editingDonation,
                    amount: parseInt(e.target.value, 10),
                  })
              : handleChange
          }
        />
      </div>
      <div>
        <label htmlFor="message">Message:</label>
        <textarea
          id="message"
          name="message"
          placeholder="Message"
          className="border p-2 rounded w-full"
          value={editingDonation ? editingDonation.message : newDonation.message}
          onChange={
            editingDonation
              ? (e) => setEditingDonation({ ...editingDonation, message: e.target.value })
              : handleChange
          }
        />
      </div>
      <div>
        <label htmlFor="action">Action:</label>
        <select
          id="action"
          name="action"
          className="border p-2 rounded w-full"
          value={editingDonation ? editingDonation.action : newDonation.action}
          onChange={
            editingDonation
              ? (e) => setEditingDonation({ ...editingDonation, action: e.target.value })
              : handleChange
          }
        >
          <option value="">Select an action</option>
          <option value="volunteer">Volunteer</option>
          <option value="donate">Donate</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div className="flex justify-between">
        {editingDonation ? (
          <>
            <button
              type="button"
              className="bg-blue-500 text-white py-2 px-4 rounded"
              onClick={() => handleUpdate(editingDonation.id)}
            >
              Update
            </button>
            <button
              type="button"
              className="bg-gray-500 text-white py-2 px-4 rounded"
              onClick={() => setEditingDonation(null)}
            >
              Cancel
            </button>
          </>
        ) : (
          <button
            type="button"
            className="bg-green-500 text-white py-2 px-4 rounded"
            onClick={handleCreate}
          >
            Add
          </button>
        )}
      </div>
    </form>
  );
};

export default DonationForm;
