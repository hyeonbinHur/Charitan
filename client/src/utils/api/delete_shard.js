import { axiosInstance } from "./axiosUtils";

const getDeletedProject = async () => {
  try {
    const response = await axiosInstance.get("shard/deleted");
    return response.data;
  } catch (err) {
    console.log("Error while read deleted project from shard", err);
  }
};

const createDeletedProject = async (newProject) => {
  try {
    console.log(newProject);
    const response = await axiosInstance.post("shard/deleted", newProject);
    return response.data;
  } catch (err) {
    console.log("Error while create delete project to shard", err);
  }
};

export { getDeletedProject, createDeletedProject };
