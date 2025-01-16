import { useState } from "react";
import StripePaymentWrapper from "../payment/StripePayment";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const DonationForm = ({
  newDonation,
  editingDonation,
  handleChange,
  handleCreate,
  handleUpdate,
  setEditingDonation,
}) => {
  const [showStripePayment, setShowStripePayment] = useState(false);
  const handleDonateClick = () => {
    if (newDonation.amount <= 0) {
      alert("Donation amount must be greater than 0");
      return;
    }
    setShowStripePayment(true);
  };
  const handlePaymentSuccess = async () => {
    try {
      await handleCreate();
      setShowStripePayment(false);
      window.location.reload();
    } catch (error) {
      console.error("Error creating donation:", error);
    }
  };

  if (showStripePayment) {
    return (
      <div>
        <button
          className="mb-4 text-blue-500"
          onClick={() => setShowStripePayment(false)}
        >
          ← Back to donation details
        </button>
        <StripePaymentWrapper
          amount={newDonation.amount * 100}
          description={`Donation from ${newDonation.name}`}
          onSuccess={handlePaymentSuccess}
        />
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-4">
      <div>
        <label htmlFor="name">Name:</label>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Name"
          className="border p-2 rounded w-full"
          value={editingDonation ? editingDonation.name : newDonation.name}
          onChange={
            editingDonation
              ? (e) =>
                  setEditingDonation({
                    ...editingDonation,
                    name: e.target.value,
                  })
              : handleChange
          }
        />
      </div>
      <div>
        <label htmlFor="amount">Amount:</label>
        <Input
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
        <Textarea
          id="message"
          name="message"
          placeholder="Message"
          className="border p-2 rounded w-full"
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
              : handleChange
          }
        />
      </div>
      <div>
        <label htmlFor="action">Action:</label>
        <select
          id="action"
          name="action"
          className="border bg-transparent p-2 rounded w-full"
          value={editingDonation ? editingDonation.action : newDonation.action}
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
            onClick={handleDonateClick}
          >
            Donate Via Stripe
          </button>
        )}
      </div>
    </form>
  );
};

export default DonationForm;
