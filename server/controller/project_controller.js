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
const get_projects_by_status = async (req, res) => {
  try {
    const { status } = req.query;
    const tests = await projectService.readProjectByStatus(status);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_projects_by_charity_name = async (req, res) => {
  try {
    const { charityName } = req.query;
    const tests = await projectService.readProjectByCharityName(charityName);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_projects_by_project_name = async (req, res) => {
  try {
    const { projectName } = req.query;
    const tests = await projectService.readProjectByProjectName(projectName);
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
    const newProject = {
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
    };
    const tests = await projectService.createProject(newProject);
    res.json(tests);
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
      current_funding,
      status,
      bankaccount,
    } = req.body;
    const updatedProject = {
      title,
      description,
      category,
      target_amount,
      current_funding,
      status,
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
  get_projects_by_status,
  get_projects_by_charity_name,
  get_projects_by_project_name,
  get_projects_by_charity,
  create_project,
  update_project,
  delete_project,
};
