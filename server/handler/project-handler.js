import connection from "../lib/db_info";

const get_projects = (req, res) => {
  connection.query("SELECT * FROM Charity_Project", (err, results) => {
    if (err) {
      res.status(500).send("Fail data");
    } else {
      res.json(results);
    }
  });
};

const get_projects_by_charity_name = (req, res) => {
  const { charityName } = req.query;
  connection.query(
    "SELECT * FROM Charity_Project WHERE charity_nae LIKE ?",
    [`%${charityName}%`],
    (err, results) => {
      if (err) {
        res.status(500).send("Fail data");
      } else {
        res.json(results);
      }
    }
  );
};
const get_projects_by_project_name = (req, res) => {
  const { projectName } = req.query;
  connection.query(
    "SELECT * FROM Charity_Project WHERE title LIKE ?",
    [`%${projectName}%`],
    (err, results) => {
      if (err) {
        res.status(500).send("Fail data");
      } else {
        res.json(results);
      }
    }
  );
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
    "INSERT INTO Charity_Project ( charity_id, title, description, category, target_amount, current_funding, status, created_at, updated_at, bankaccount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
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
      res.status(201).json({ title, description });
    }
  });
};

const update_project = (req, res) => {
  const project_id = req.params.id;
  const {
    title,
    description,
    category,
    target_amount,
    current_funding,
    status,
    bankaccount,
  } = req.body;

  // SQL 쿼리에서 updated_at을 자동으로 현재 시간으로 설정
  const query = `
    UPDATE Charity_Project 
    SET 
      title = ?, 
      description = ?, 
      category = ?, 
      target_amount = ?, 
      current_funding = ?, 
      status = ?, 
      updated_at = NOW(),
      bankaccount = ? 
    WHERE project_id = ?`;

  const values = [
    title,
    description,
    category,
    target_amount,
    current_funding,
    status,
    bankaccount,
    project_id,
  ];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error(err); // 에러 로그를 콘솔에 출력해 주세요
      res.status(500).send("Failed to update data");
    } else {
      res.status(200).json({ title, description });
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
  get_projects_by_charity_name,
  get_projects_by_project_name,
};
