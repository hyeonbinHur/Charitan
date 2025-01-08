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

const findOneByStatus = async (status, category) => {
  try {
    const query =
      "SELECT * FROM Charity_Project WHERE status = ? AND category = ?";
    const values = [status, category];
    const [results] = await connection.execute(query, values);
    return results;
  } catch (error) {
    throw error;
  }
};

const findOneByCharityName = (charityName, status, category, charities) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM Charity_Project WHERE charity_name LIKE ? AND status = ? AND category = ? AND charity_id IN (?)";
    const values = [`%${charityName}%`, status, category, charities];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findOneByProjectName = (projectName, status, category, charities) => {
  return new Promise((resolve, reject) => {
    console.log(projectName, status, category, charities.join(","));
    const query =
      "SELECT * FROM Charity_Project WHERE title LIKE ? AND status = ? AND category = ? AND charity_id IN (?)";
    const values = [`%${projectName}%`, status, category, charities.join(",")];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findManyByCountry = (charities, status, category) => {
  return new Promise((resolve, reject) => {
    const query =
      "SELECT * FROM Charity_Project WHERE charity_id IN (?) AND status = ? AND category = ?";
    const values = [charities, status, category];
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
      "INSERT INTO Charity_Project ( charity_id, title, thumbnail, description, category, target_amount, current_funding, status, created_at, updated_at, bankaccount, charity_name) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
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

const updateOne = (id, updatedProject) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Charity_Project SET title = ?, description = ?, category = ?, target_amount = ?, status = ?, updated_at = ?, bankaccount = ? WHERE project_id = ?`;
    const values = [
      updatedProject.title,
      updatedProject.description,
      updatedProject.category,
      updatedProject.target_amount,
      updatedProject.status,
      updatedProject.updated_at,
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
  findManyByCountry,
  deleteOne,
  createOne,
  updateOne,
};
