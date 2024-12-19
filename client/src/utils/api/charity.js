import { axiosInstance } from "./axiosUtils";

const getCharities = async () => {
  try {
    const response = await axiosInstance.get("charity");
    return response.data;
  } catch (err) {
    console.log("Error fetching Charitys:", err);
    throw err;
  }
};
const getCharity = async (id) => {
  try {
    const response = await axiosInstance.get(`charity/${id}`);
    return response.data[0];
  } catch (err) {
    console.log("Error get one Charity", err);
    throw err;
  }
};
const createCharity = async (newCharity) => {
  try {
    const response = await axiosInstance.post("charity", newCharity);
    return response.data;
  } catch (err) {
    console.log("error while creating new Charity", err);
    throw err;
  }
};
const updateCharity = async (newCharity, id) => {
  try {
    const response = await axiosInstance.put(`charity/${id}`, newCharity);
    return response.data;
  } catch (err) {
    console.log("error while updating Charity", err);
    throw err;
  }
};
const deleteCharity = async (id) => {
  try {
    const response = await axiosInstance.delete(`charity/${id}`);
    return response.data;
  } catch (err) {
    console.log("error while deleting Charity", err);
    throw err;
  }
};

export {
  getCharities,
  getCharity,
  createCharity,
  updateCharity,
  deleteCharity,
};
