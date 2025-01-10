import { useState, useEffect } from "react";
import DonationForm from "../components/donation/DonationForm";
import DonationTable from "../components/donation/DonationTable";
import DonationModal from "../components/donation/DonationModal";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../utils/api/axiosUtils";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendEmail } from "../utils/api/email";

const DonationPage = () => {
  const { project_id } = useParams();
  const [donations, setDonations] = useState([]);
  const [newDonation, setNewDonation] = useState({
    donor_id: null,
    amount: 0,
    name: "",
    message: "",
    action: "Donate",
    project_id: project_id,
  });
  const [editingDonation, setEditingDonation] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchDonations = async () => {
    try {
      console.log("Fetching donations for project_id:", project_id);
      const response = await axiosInstance.get(
        `/donations/project/${project_id}`
      );
      console.log("Fetched donations:", response.data);
      setDonations(response.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    if (project_id) {
      fetchDonations();
    }
  }, [project_id]);

  const handleChange = (e) => {
    setNewDonation({ ...newDonation, [e.target.name]: e.target.value });
  };

  const { mutate: mutateSendEmail } = useMutation({
    mutationFn: ({ newEmail }) => {
      return sendEmail(newEmail);
    },
    onSuccess: () => {
      console.log("email sent");
      setIsModalOpen(false);
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const handleCreate = async () => {
    try {
      const response = await axiosInstance.post(
        `donations/project/${project_id}`,
        newDonation
      );
      setDonations(response.data);
      console.log("Donation created:", response.data);

      const newEmail = {
        title: "Your Donation has been successfully made!",
        content: `Thank you for you donattion!`,
        status: "UNREAD",
        receiver_type: "Donor",
        receiver_id: newDonation.donor_id,
        receiver_email: "hhb7201@naver.com",
        sender: "Admin",
        created_at: new Date(),
      };
      setNewDonation({
        donor_id: null,
        amount: 0,
        name: "",
        message: "",
        action: "Donate",
        project_id: project_id,
      });
      mutateSendEmail({ newEmail: newEmail });
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
      await axiosInstance.delete(`/donations/${id}`);
      console.log("Donation deleted:", id);
      await fetchDonations(); // Refresh donations after delete
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
        handleDelete={(id) => handleDelete(id)} // Pass the id properly
      />
    </main>
  );
};

export default DonationPage;
