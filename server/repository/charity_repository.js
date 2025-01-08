import connection from "../lib/db_info.js";

const findAll = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity";
    connection.query(query, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

const findManyByCountry = (country) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT charity_id FROM Charity WHERE country = ?";
    const values = [country];
    // @ts-ignore
    connection.query(query, values, (err, results) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.error(results);
        resolve(results);
      }
    });
  });
};
const findOne = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity WHERE charity_id = ?";
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
const createOne = (newCharity) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO Charity ( organization_name, description, category, password, avatar, createdAt, updatedAt, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const values = [
      newCharity.organization_name,
      newCharity.description,
      newCharity.category,
      newCharity.password,
      newCharity.avatar,
      newCharity.createdAt,
      newCharity.updatedAt,
      newCharity.country,
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
const updateOne = (id, updatedCharity) => {
  return new Promise((resolve, reject) => {
    const query = `
      UPDATE Charity 
      SET 
        organization_name = ?, 
        description = ?, 
        category = ?, 
        password = ?, 
        avatar = ?, 
        createdAt = ?, 
        updatedAt = ?, 
        country = ?
      WHERE charity_id = ?
    `;
    const values = [
      updatedCharity.organization_name,
      updatedCharity.description,
      updatedCharity.category,
      updatedCharity.password,
      updatedCharity.avatar,
      updatedCharity.createdAt,
      updatedCharity.updatedAt,
      updatedCharity.country,
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
    const query = "DELETE FROM Charity WHERE charity_id = ?";
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
const findOneByEmail = (email) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM Charity WHERE email = ?";
    const values = [email];
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
  findManyByCountry,
  deleteOne,
  createOne,
  updateOne,
  findOneByEmail,
};
