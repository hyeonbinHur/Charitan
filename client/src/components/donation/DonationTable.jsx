import React from "react";

const DonationTable = ({ donations, setEditingDonation, handleDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Message</th>
            <th className="border px-4 py-2">Action</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {donations.map((donation) => (
            <tr key={donation.id}>
              <td className="border px-4 py-2">{donation.name}</td>
              <td className="border px-4 py-2">{donation.amount}</td>
              <td className="border px-4 py-2">{donation.message}</td>
              <td className="border px-4 py-2">{donation.action}</td>
              <td className="border px-4 py-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                  onClick={() => setEditingDonation(donation)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
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
  );
};

export default DonationTable;
