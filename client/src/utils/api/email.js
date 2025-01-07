import { axiosInstance } from "./axiosUtils";

const sendEmail = async (newEmail) => {
  try {
    console.log(newEmail);
    const response = await axiosInstance.post("send-email", newEmail);
    return response.data[0];
  } catch (err) {
    console.error("Error while sending email", err);
  }
};

export { sendEmail };
