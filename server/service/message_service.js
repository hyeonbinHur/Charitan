import messageRepository from "../repository/message_repository.js";
/**
 * sample auth api
 */
const readMessage = async (projectId) => {
  try {
    const user = await messageRepository.readMany(projectId);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const createMessage = async (newMessage) => {
  try {
    const user = await messageRepository.createOne(newMessage);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const deleteMessage = async (messageId) => {
  try {
    const user = await messageRepository.deleteOne(messageId);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
export default { readMessage, createMessage, deleteMessage };
