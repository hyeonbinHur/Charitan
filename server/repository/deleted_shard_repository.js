import connection from "../lib/db_info.js";

const createOne = (newProject) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Charity_Project_Shard ( project_id, charity_id, title, thumbnail, description, category, target_amount, current_funding, created_at, updated_at, bankaccount, charity_name, status ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      newProject.project_id,
      newProject.charity_id,
      newProject.title,
      newProject.thumbnail,
      newProject.description,
      newProject.category,
      newProject.target_amount,
      newProject.current_funding,
      newProject.created_at,
      newProject.updated_at,
      newProject.bankaccount,
      newProject.charity_name,
      "Deleted",
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
