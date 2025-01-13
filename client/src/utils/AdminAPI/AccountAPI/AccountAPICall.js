import axios from "axios";
import { API_BASE_URL } from "../APIService";

// Get all admins
export const getAllAdmins = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/admins/get`, {timeout: 5000});
    return response.data;
  } catch (error) {
    console.error("Error fetching admins:", error);
    throw error;
  }
};

// Create a new admin
export const createAdmin = async (admin) => {
  try {
    await axios.post(`${API_BASE_URL}/admins/create`, admin);
  } catch (error) {
    console.error("Error creating admin:", error);
    throw error;
  }
};

// Update admin password
export const updateAdminPassword = async (adminId, newPassword) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/admins/update-password`, null, {
      params: { adminId, newPassword },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

// Delete admin by ID
export const deleteAdminById = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/admins/delete/${id}`);
  } catch (error) {
    console.error("Error deleting admin:", error);
    throw error;
  }
};
