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
const findHaltedAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity_Project WHERE status = ?";
    connection.query(query, ["Halted"], (err, results) => {
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
const findMayByStatus = (status) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM Charity_Project WHERE status = ?";
    let values = [status];

    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findOneByStatus = (status, category) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT * FROM Charity_Project WHERE status = ?";
    let values = [status];
    if (category !== "All Categories") {
      values.push(category);
      query += " AND category = ?";
    }
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findOneByCharityName = (charityName, status, category, charities) => {
  return new Promise((resolve, reject) => {
    let query =
      "SELECT * FROM Charity_Project WHERE charity_name LIKE ? AND status = ? AND charity_id IN (?)";
    let values = [`%${charityName}%`, status, charities];
    if (category !== "All Categories") {
      query =
        "SELECT * FROM Charity_Project WHERE charity_name LIKE ? AND status = ? AND category = ? AND charity_id IN (?)";
      values = [`%${charityName}%`, status, category, charities];
    }

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
    let query =
      "SELECT * FROM Charity_Project WHERE title LIKE ? AND status = ? AND charity_id IN (?)";
    let values = [`%${projectName}%`, status, charities];
    if (category !== "All Categories") {
      query =
        "SELECT * FROM Charity_Project WHERE title LIKE ? AND status = ? AND category = ? AND charity_id IN (?)";
      values = [`%${projectName}%`, status, category, charities];
    }

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

const updateCompleteOne = (id) => {
  return new Promise((resolve, reject) => {
    const query = `UPDATE Charity_Project SET status = ? WHERE project_id = ?`;
    const values = ["Completed", id];
    connection.query(query, values, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const updateOneDonation = (id, funding, is_completed) => {
  return new Promise((resolve, reject) => {
    let query = `UPDATE Charity_Project SET current_funding = ? WHERE project_id = ?`;
    let values = [funding, id];

    if (is_completed) {
      query = `UPDATE Charity_Project SET current_funding = ?, status = ? WHERE project_id = ?`;
      values = [funding, "Completed", id];
    }
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
  findHaltedAll,
  findOneByStatus,
  findOneByCharityName,
  findOneByProjectName,
  findOneByCharity,
  findManyByCountry,
  deleteOne,
  createOne,
  updateOne,
  updateCompleteOne,
  findMayByStatus,
  updateOneDonation,
};
