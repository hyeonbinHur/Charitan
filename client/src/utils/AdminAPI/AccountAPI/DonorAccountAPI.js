import axios from "axios";
import { API_BASE_URL } from "../APIService"; // Adjust the import path as needed

// Get all donors
export const getAllDonors = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/donors/get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching donors:", error);
    throw error;
  }
};

// Create a new donor
export const createDonorByAdminRole = async (donor) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/donors/create`, donor);
    return response.data;
  } catch (error) {
    console.error("Error creating donor:", error);
    throw error;
  }
};

// Update donor details
export const updateDonor = async (id, donor) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/donors/update/${id}`, donor);
    return response.data;
  } catch (error) {
    console.error("Error updating donor:", error);
    throw error;
  }
};

// Delete donor by ID
export const deleteDonorByIdByAdminRole = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/donors/delete/${id}`);
  } catch (error) {
    console.error("Error deleting donor:", error);
    throw error;
  }
};
