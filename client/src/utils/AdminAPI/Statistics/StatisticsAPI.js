import axios from "axios";
import { API_BASE_URL } from "../APIService";

// Fetch total projects
export const fetchTotalProjects = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/total-projects`);
    return response.data; // Total number of projects
  } catch (error) {
    console.error("Error fetching total projects:", error);
    throw error;
  }
};

// Fetch total donations
export const fetchTotalDonations = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/total-donation`);
    return response.data; // Total donations amount
  } catch (error) {
    console.error("Error fetching total donations:", error);
    throw error;
  }
};

// Fetch charity statistics
export const fetchCharityStatistics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/charity`);
    return response.data; // Charity statistics
  } catch (error) {
    console.error("Error fetching charity statistics:", error);
    throw error;
  }
};

// Fetch donor statistics
export const fetchDonorStatistics = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/donor`);
    return response.data; // Donor statistics
  } catch (error) {
    console.error("Error fetching donor statistics:", error);
    throw error;
  }
};

// Fetch guest donor donations (with optional name filter)
export const fetchGuestDonations = async (name = "") => {
  try {
    const response = await axios.get(`${API_BASE_URL}/statistics/guest`, {
      params: { name },
    });
    return response.data; // Guest donor donations
  } catch (error) {
    console.error("Error fetching guest donations:", error);
    throw error;
  }
};
