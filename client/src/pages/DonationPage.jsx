import React, { useState, useEffect } from "react";
import DonationForm from "../components/donation/DonationForm";
import DonationTable from "../components/donation/DonationTable";
import DonationModal from "../components/donation/DonationModal";

const DonationPage = () => {
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({
    name: "",
    amount: 0,
    message: "",
    action: "",
  });
  const [editingDonation, setEditingDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleChange = (e) => {
    setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
  };

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
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating donation:", error);
    }
  };

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
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating donation:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/donations/${id}`, { method: "DELETE" });
      setDonations(donations.filter((d) => d.id !== id));
    } catch (error) {
      console.error("Error deleting donation:", error);
    }
  };

  return (
    <main className="donation-page p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Donation Page</h1>
      <button
        className="bg-green-500 text-white py-2 px-4 rounded"
        onClick={() => setIsModalOpen(true)}
      >
        Add Donation
      </button>
      <DonationModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <DonationForm
          newDonation={newDonation}
          editingDonation={editingDonation}
          handleChange={handleChange}
          handleCreate={handleCreate}
          handleUpdate={handleUpdate}
          setEditingDonation={setEditingDonation}
        />
      </DonationModal>
      <DonationTable
        donations={donations}
        setEditingDonation={(donation) => {
          setEditingDonation(donation);
          setIsModalOpen(true);
        }}
        handleDelete={handleDelete}
      />
    </main>
  );
};

export default DonationPage;
