import connection from "../lib/db_info.js";

const readMany = (projectId) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Message WHERE project_id = ?";
    const values = [projectId];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const createOne = (newMessage) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Message (project_id, donation_id, donor_email, content) VALUES (?,?,?,?)";
    const values = [
      newMessage.project_id,
      newMessage.donataion_id,
      newMessage.donor_email,
      newMessage.content,
    ];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const deleteOne = (messageId) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Message WHERE message_id = ?";
    const values = [messageId];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

export default {
  readMany,
  createOne,
  deleteOne,
};
