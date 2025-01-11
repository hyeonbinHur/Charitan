import connection from "../lib/db_info.js";

const createOne = (newEmail) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Email ( title, content, created_at, status, receiver_type, receiver_id, sender) VALUES (?,?,?,?,?,?,?)";
    const values = [
      newEmail.title,
      newEmail.content,
      newEmail.created_at,
      newEmail.status,
      newEmail.receiver_type,
      newEmail.receiver_id,
      newEmail.sender,
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

const findMany = (receiver_type, receiver_id) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM Email WHERE receiver_type = ? AND receiver_id = ?";
    const values = [receiver_type, receiver_id];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};
const deleteOne = (email_id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Email WHERE message_id = ?";
    const values = [email_id];
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
  createOne,
  findMany,
  deleteOne,
};
