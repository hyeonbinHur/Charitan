import shardService from "../service/completed_shard_service.js";

const create_completed_project = async (req, res) => {
  try {
    const {
      project_id,
      charity_id,
      title,
      thumbnail,
      description,
      category,
      target_amount,
      current_funding,
      created_at,
      updated_at,
      bankaccount,
      charity_name,
    } = req.body;
    const newProject = {
      project_id,
      charity_id,
      title,
      thumbnail,
      description,
      category,
      target_amount,
      current_funding,
      created_at,
      updated_at,
      bankaccount,
      charity_name,
    };
    const user = await shardService.createDeletedProject(newProject);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const read_completed_projects = async (req, res) => {
  try {
    const user = await shardService.readDeletedProjects();
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default {
  create_completed_project,
  read_completed_projects,
};
