import shardRepository from "../repository/completed_shard_repository.js";

/**
 * sample auth api
 */
const createCompltedProject = async (newProject) => {
  try {
    const user = await shardRepository.createOne(newProject);
    // await setUser(user[0].user_id, user[0].user_name);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readCompltedProjects = async () => {
  try {
    const user = await shardRepository.findMany();
    // await setUser(user[0].user_id, user[0].user_name);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
export default { createCompltedProject, readCompltedProjects };
