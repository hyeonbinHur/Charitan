import connection from "../lib/db_info.js";

const createOne = (newProject) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Charity_Project ( project_id, charity_id, title, thumbnail, description, category, target_amount, current_funding, status, created_at, updated_at, bankaccount, charity_name, status ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, Deleted)";
    const values = [
      newProject.project_id,
      newProject.charity_id,
      newProject.title,
      newProject.thumbnail,
      newProject.description,
      newProject.category,
      newProject.target_amount,
      newProject.current_funding,
      newProject.status,
      newProject.created_at,
      newProject.updated_at,
      newProject.bankaccount,
      newProject.charity_name,
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

const findMany = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity_Project_Shard WHERE status = Deleted";
    connection.query(query, (err, results) => {
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
};
