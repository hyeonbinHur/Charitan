import shardRepository from "../repository/deleted_shard_repository.js";

/**
 * sample auth api
 */
const createDeletedProject = async (newProject) => {
  try {
    const user = await shardRepository.createOne(newProject);
    // await setUser(user[0].user_id, user[0].user_name);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readDeletedProjects = async () => {
  try {
    const user = await shardRepository.findMany();
    // await setUser(user[0].user_id, user[0].user_name);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
export default { createDeletedProject, readDeletedProjects };
