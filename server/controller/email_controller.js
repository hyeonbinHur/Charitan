import emailService from "../service/email_service.js";

const send_email = async (req, res) => {
  // set cache
  console.log("receive");
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
const get_email = async (req, res) => {
  try {
    const { receiver_type } = req.query;
    const { receiver_id } = req.query;
    console.log(receiver_id, receiver_type);
    const emails = await emailService.readEmail(receiver_type, receiver_id);
    res.json(emails);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const delete_email = async (req, res) => {
  try {
    const email_id = req.params.email_id;
    const result = await emailService.deleteEmail(email_id);
    res.json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default {
  send_email,
  get_email,
  delete_email,
};
