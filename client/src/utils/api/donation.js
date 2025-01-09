import { axiosInstance } from "./axiosUtils";

export const createDonation = async () => {
  try {
    const response = await axiosInstance.post(
      `donations/project/${project_id}`,
      newDonation
    );
    setDonations(response.data);
    setNewDonation({
      donor_id: null,
      amount: 0,
      name: "",
      message: "",
      action: "Donate",
      project_id: project_id,
    });
    setIsModalOpen(false);
  } catch (error) {
    console.error("Error creating donation:", error);
  }
};

export const updateDonation = async (id) => {
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

export const deleteDonation = async (id) => {
  try {
    await fetch(`/api/donations/${id}`, { method: "DELETE" });
    setDonations(donations.filter((d) => d.id !== id));
  } catch (error) {
    console.error("Error deleting donation:", error);
  }
};
export const getDonationsByProject = async (projectId) => {
  try {
    const response = await axiosInstance.get(`donations/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching project donations:", error);
  }
};
