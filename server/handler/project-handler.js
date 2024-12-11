const connection = require("../lib/db_info");

const get_projects = (req, res) => {
  connection.query("SELECT * FROM Charity_Project", (err, results) => {
    if (err) {
      res.status(500).send("Fail data");
    } else {
      res.json(results);
    }
  });
};

const get_project = (req, res) => {
  const project_id = req.params.id;
  const query = "SELECT * FROM Charity_Project WHERE project_id = ?";
  const values = [project_id];
  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send("Fail data");
    } else {
      res.json(results);
    }
  });
};

const create_project = (req, res) => {
  const {
    charity_id,
    title,
    description,
    category,
    target_amount,
    current_funding,
    status,
    created_at,
    updated_at,
    bankaccount,
  } = req.body;
  const query =
    "INSERT INTO Charity_Project (  charity_id, title, description, category, target_amount, current_funding, status, created_at, updated_at, bankaccount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
  const values = [
    charity_id,
    title,
    description,
    category,
    target_amount,
    current_funding,
    status,
    created_at,
    updated_at,
    bankaccount,
  ];
  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send("Failed to insert data");
    } else {
      res.status(201).json({ title, body });
    }
  });
};

const update_project = (req, res) => {
  const project_id = req.params.id;
  const { title } = req.body;
  const query = "UPDATE Charity_Project SET title = ? WHERE project_id = ?";
  const values = [title, project_id];
  connection.query(query, values, (err, results) => {
    if (err) {
      res.status(500).send("Failed to update data");
    } else {
      res.status(201).json({ post_uuid, title });
    }
  });
};

const delete_project = (req, res) => {
  const project_id = req.params.id;
  const query = "DELETE FROM Charity_Project WHERE project_id = ?";
  const value = [project_id];
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

module.exports = {
  get_projects,
  get_project,
  create_project,
  update_project,
  delete_project,
  get_projects_by_charity,
};