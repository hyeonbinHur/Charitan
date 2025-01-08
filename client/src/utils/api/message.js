import { axiosInstance } from "./axiosUtils";

const readMessages = async (projectId) => {
  try {
    const response = await axiosInstance.get(`message/${projectId}`);
    return response.data[0];
  } catch (err) {
    console.error("Error while charity signin", err);
  }
};

const sendMessage = async (newMessage) => {
  try {
    const response = await axiosInstance.post(`message`, newMessage);
    return response.data[0];
  } catch (err) {
    console.error("Error while charity signin", err);
  }
};

const deleteMesage = async (messageId) => {
  try {
    const response = await axiosInstance.delete(
      `message/${messageId}`,
      messageId
    );
    return response.data[0];
  } catch (err) {
    console.error("Error while charity signin", err);
  }
};

export { readMessages, sendMessage, deleteMesage };
