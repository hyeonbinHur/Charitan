import emailService from "../service/email_service.js";

const send_email = async (req, res) => {
  // set cache
  try {
    const {
      title,
      content,
      created_at,
      status,
      receiver_type,
      receiver_id,
      receiver_email,
      sender,
    } = req.body;
    const newEmail = {
      title,
      content,
      created_at,
      status,
      receiver_type,
      receiver_id,
      receiver_email,
      sender,
    };
    const user = await emailService.sendEmail(newEmail);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default {
  send_email,
};
