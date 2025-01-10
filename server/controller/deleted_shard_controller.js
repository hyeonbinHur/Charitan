import shardService from "../service/deleted_shard_service.js";

const create_deleted_project = async (req, res) => {
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
const read_deleted_projects = async (req, res) => {
  try {
    console.log("here de");
    const user = await shardService.readDeletedProjects();
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default {
  create_deleted_project,
  read_deleted_projects,
};
