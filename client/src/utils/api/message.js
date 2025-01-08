import { axiosInstance } from "./axiosUtils";

const readMessages = async (projectId) => {
  try {
    console.log(projectId);
    const response = await axiosInstance.get(`message/${projectId}`);
    return response.data;
  } catch (err) {
    console.error("Error while read project message", err);
  }
};

const sendMessage = async (newMessage) => {
  try {
    console.log(newMessage);
    const response = await axiosInstance.post(`message`, newMessage);
    return response.data;
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
    return response.data;
  } catch (err) {
    console.error("Error while charity signin", err);
  }
};

export { readMessages, sendMessage, deleteMesage };
