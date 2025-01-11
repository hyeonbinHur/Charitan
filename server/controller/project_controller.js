import projectService from "../service/project_service.js";

const get_projects = async (req, res) => {
  try {
    const tests = await projectService.readAllProjects();
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_project = async (req, res) => {
  try {
    const id = req.params.id;
    const tests = await projectService.readProject(id);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_halted_project = async (req, res) => {
  try {
    const tests = await projectService.readHaltedProject();
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const get_projects_by_only_status = async (req, res) => {
  try {
    const { status } = req.query;
    const tests = await projectService.readProjectByOnlyStatus(status);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

const get_projects_by_status = async (req, res) => {
  try {
    const { status } = req.query;
    const { category } = req.query;
    const tests = await projectService.readProjectByStatus(status, category);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_projects_by_charity_name = async (req, res) => {
  try {
    const { charityName } = req.query;
    const { status } = req.query;
    const { category } = req.query;
    const { country } = req.query;
    const tests = await projectService.readProjectByCharityName(
      charityName,
      status,
      category,
      country
    );
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_projects_by_project_name = async (req, res) => {
  try {
    const { projectName } = req.query;
    const { status } = req.query;
    const { category } = req.query;
    const { country } = req.query;
    const tests = await projectService.readProjectByProjectName(
      projectName,
      status,
      category,
      country
    );
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_projects_by_country = async (req, res) => {
  try {
    const { country } = req.query;
    const { status } = req.query;
    const { category } = req.query;
    const tests = await projectService.readProjectByCountry(
      country,
      status,
      category
    );
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_projects_by_charity = async (req, res) => {
  try {
    const id = req.params.id;
    const tests = await projectService.readProjectByCharity(id);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const create_project = async (req, res) => {
  try {
    const {
      charity_id,
      thumbnail,
      title,
      description,
      category,
      target_amount,
      current_funding,
      status,
      created_at,
      updated_at,
      bankaccount,
      charity_name,
    } = req.body;
    const newProject = {
      charity_id,
      thumbnail,
      title,
      description,
      category,
      target_amount,
      current_funding,
      status,
      created_at,
      updated_at,
      bankaccount,
      charity_name,
    };
    const tests = await projectService.createProject(newProject);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const update_project_complete = async (req, res) => {
  try {
    const id = req.params.id;
    const test = await projectService.updateProjectComplete(id);
    res.json(test);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const update_project_donation = async (req, res) => {
  try {
    const id = req.params.id;
    const { donation_amount } = req.body;
    const { is_completed } = req.body;
    const test = await projectService.updateProjectDonation(
      id,
      donation_amount,
      is_completed
    );
    res.json(test);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const update_project = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      title,
      description,
      category,
      target_amount,
      status,
      updated_at,
      bankaccount,
    } = req.body;
    const updatedProject = {
      title,
      description,
      category,
      target_amount,
      status,
      updated_at,
      bankaccount,
    };
    const tests = await projectService.updateProject(id, updatedProject);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const delete_project = async (req, res) => {
  try {
    const id = req.params.id;
    const tests = await projectService.deleteProject(id);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  get_projects,
  get_project,
  get_halted_project,
  get_projects_by_status,
  get_projects_by_charity_name,
  get_projects_by_project_name,
  get_projects_by_country,
  get_projects_by_charity,
  create_project,
  update_project,
  delete_project,
  update_project_complete,
  get_projects_by_only_status,
  update_project_donation,
};
