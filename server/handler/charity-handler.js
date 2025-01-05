import connection from "../lib/db_info.js";

const get_charities = (req, res) => {
  connection.query("SELECT * FROM Charity", (err, results) => {
    if (err) {
      res.status(500).send("Fail data");
    } else {
      res.json(results);
    }
  });
};

const get_charity = (req, res) => {
  const charity_id = req.params.id;
  const query = "SELECT * FROM Charity WHERE charity_id = ?";
  const values = [charity_id];
  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send("Fail data");
    } else {
      res.json(results);
    }
  });
};

const create_charity = (req, res) => {
  const {
    organization_name,
    description,
    category,
    password,
    avatar,
    createdAt,
    updatedAt,
    country,
  } = req.body;
  const query =
    "INSERT INTO Charity ( organization_name, description, category, password, avatar, createdAt, updatedAt, country) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    organization_name,
    description,
    category,
    password,
    avatar,
    createdAt,
    updatedAt,
    country,
  ];
  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send("Failed to insert data");
    } else {
      res.status(201).json({ organization_name, description });
    }
  });
};

const update_charity = (req, res) => {
  const charity_id = req.params.id;
  const {
    organization_name,
    description,
    category,
    password,
    avatar,
    createdAt,
    updatedAt,
    country,
  } = req.body;

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
    organization_name,
    description,
    category,
    password,
    avatar,
    createdAt,
    updatedAt,
    country,
    charity_id,
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send("Failed to update charity data");
    } else {
      res.status(200).json({ message: "Charity updated successfully" });
    }
  });
};

const delete_charity = (req, res) => {
  const charity_id = req.params.id;
  const query = "DELETE FROM Charity WHERE charity_id = ?";
  const value = [charity_id];
  connection.query(query, value, (err, results) => {
    if (err) {
      res.status(500).send("Faild to delete data");
    } else {
      res.status(201).json({ results });
    }
  });
};

const get_projects_by_charity = (req, res) => {
  const charity_id = req.params.id;
  const query = "SELECT * FROM Charity_Project WHERE charity_id = ?";
  connection.query(query, [charity_id], (err, results) => {
    if (err) {
      res.status(500).send("Fail data");
    } else {
      res.json(results);
    }
  });
};

export default {
  get_charities,
  get_charity,
  create_charity,
  update_charity,
  delete_charity,
  get_projects_by_charity,
};
