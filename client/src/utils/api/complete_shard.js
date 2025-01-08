import { axiosInstance } from "./axiosUtils";

const getCompletedProject = async () => {
  try {
    const response = await axiosInstance.get("shard/completed");
    return response.data;
  } catch (err) {
    console.log("Error while read deleted project from shard", err);
  }
};

const createCompletedProject = async () => {
  try {
    const response = await axiosInstance.post("shard/completed");
    return response.data;
  } catch (err) {
    console.log("Error while create delete project to shard", err);
  }
};

export { getCompletedProject, createCompletedProject };
