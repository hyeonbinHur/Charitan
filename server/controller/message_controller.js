import messageService from "../service/message_service.js";

const read_message = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const user = await messageService.readMessage(projectId);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const create_message = async (req, res) => {
  try {
    const { project_id, donataion_id, donor_email, content } = req.body;
    const newMessage = { project_id, donataion_id, donor_email, content };
    const user = await messageService.createMessage(newMessage);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const delete_message = async (req, res) => {
  try {
    const messageId = req.params.messageId;
    const user = await messageService.deleteMessage(messageId);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  read_message,
  create_message,
  delete_message,
};
