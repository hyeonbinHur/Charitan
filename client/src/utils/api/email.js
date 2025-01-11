import { axiosInstance } from "./axiosUtils";

const sendEmail = async (newEmail) => {
  try {
    const response = await axiosInstance.post("send-email", newEmail);
    return response.data[0];
  } catch (err) {
    console.error("Error while sending email", err);
  }
};
const readEmails = async (receiver_type, receiver_id) => {
  try {
    const response = await axiosInstance.get(
      `get-email?receiver_type=${receiver_type}&receiver_id=${receiver_id}`
    );
    return response.data;
  } catch (err) {
    console.error("Error while reading certain user's email", err);
  }
};
const deleteEmail = async (email_id) => {
  try {
    const response = await axiosInstance.delete(`delete-email/${email_id}`);
    return response.data;
  } catch (err) {
    console.lerr("Error while deleting email", err);
  }
};

export { sendEmail, readEmails, deleteEmail };
