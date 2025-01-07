import { axiosEmailUtils } from "./axiosEmailUtils";

const sendEmail = async (newEmail) => {
  try {
    const response = await axiosEmailUtils.post("send-email", newEmail);
    return response.data[0];
  } catch (err) {
    console.error("Error while sending email", err);
  }
};

export { sendEmail };
