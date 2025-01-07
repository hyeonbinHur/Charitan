import { axiosInstance } from "./axiosUtils";

const signinCharity = async (userInfo) => {
  try {
    const response = await axiosInstance.post(`signin/charity`, userInfo);
    return response.data[0];
  } catch (err) {
    console.error("Error while charity signin", err);
  }
};
const signinDonor = async (userInfo) => {
  try {
    const response = await axiosInstance.post(`signin/donor`, userInfo);
    return response.data[0];
  } catch (err) {
    console.error("Error while charity signin", err);
  }
};
const signinAdmin = async (userInfo) => {
  try {
    const response = await axiosInstance.post(`signin/admin`, userInfo);
    return response.data[0];
  } catch (err) {
    console.error("Error while charity signin", err);
  }
};
export { signinAdmin, signinCharity, signinDonor };
