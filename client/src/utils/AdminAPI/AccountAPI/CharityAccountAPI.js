import axios from "axios";
import { API_BASE_URL } from "../APIService"; // Adjust the import path as needed

// Get all charities
export const getAllCharities = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/charities/get`);
    return response.data;
  } catch (error) {
    console.error("Error fetching charities:", error);
    throw error;
  }
};

// Create a new charity
export const createCharityByAdminRole = async (charity) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/charities/create`, charity);
    return response.data;
  } catch (error) {
    console.error("Error creating charity:", error);
    throw error;
  }
};

// Update charity details
export const updateCharity = async (id, charity) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/charities/update/${id}`, charity);
    return response.data;
  } catch (error) {
    console.error("Error updating charity:", error);
    throw error;
  }
};

// Delete charity by ID
export const deleteCharityByIdByAdminRole = async (id) => {
  try {
    await axios.delete(`${API_BASE_URL}/charities/delete/${id}`);
  } catch (error) {
    console.error("Error deleting charity:", error);
    throw error;
  }
};
