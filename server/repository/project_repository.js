import connection from "../lib/db_info.js";

const findAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity_Project";
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findOne = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity_Project WHERE project_id = ?";
    const values = [id];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findOneByStatus = (status) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity_Project WHERE status = ?";
    const values = [status];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findOneByCharityName = (charityName) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity_Project WHERE charity_name LIKE ?";
    const values = [charityName];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findOneByProjectName = (projectName) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity_Project WHERE title LIKE ?";
    const values = [projectName];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findOneByCharity = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity_Project WHERE charity_id = ?";
    const values = [id];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const createOne = (newProject) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Charity_Project ( charity_id, title, description, category, target_amount, current_funding, status, created_at, updated_at, bankaccount, charity_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      newProject.charity_id,
      newProject.title,
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

const updateOne = (id, updatedProject) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Charity_Project SET title = ?, description = ?, category = ?, target_amount = ?, current_funding = ?, status = ?, updated_at = NOW(), bankaccount = ? WHERE project_id = ?`;
    const values = [
      updatedProject.title,
      updatedProject.description,
      updatedProject.category,
      updatedProject.target_amount,
      updatedProject.current_funding,
      updatedProject.status,
      updatedProject.bankaccount,
      id,
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

const deleteOne = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM Charity_Project WHERE project_id = ?";
    const values = [id];
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
  findAll,
  findOne,
  findOneByStatus,
  findOneByCharityName,
  findOneByProjectName,
  findOneByCharity,
  deleteOne,
  createOne,
  updateOne,
};
