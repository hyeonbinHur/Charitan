import emailRepository from "../repository/email_repository.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const nodeMailSender = async (receiverEmail, subject, message) => {
  try {
    const newEmail = {
      receiverEmail: receiverEmail,
      subject: subject,
      message: message,
    };
    // @ts-ignore
    const response = await axios.post(process.env.EMAIL_URL, newEmail);
    return response.data;
  } catch (err) {
    console.error("Error fetching external data", err);
    throw new Error("External API call failed");
  }
};

/**
 * sample auth api
 */

// 여기서 socket io && email rest api 받아야함
const sendEmail = async (email) => {
  try {
    console.log(email);
    await nodeMailSender(email.receiver_email, email.title, email.content);
    const user = await emailRepository.createOne(email);
    // await setUser(user[0].user_id, user[0].user_name);
    return user;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to read data", err.message);
  }
};
export default { sendEmail };
