import { axiosInstance } from "./axiosUtils";

const getProjects = async (status, category) => {
  try {
    const response = await axiosInstance.get(
      `project/search/status?status=${status}&category=${category}`
    );
    return response.data;
  } catch (err) {
    console.log("Error fetching projects:", err);
    throw err;
  }
};
const getProject = async (id) => {
  try {
    const response = await axiosInstance.get(`project/${id}`);
    return response.data[0];
  } catch (err) {
    console.log("Error get one project", err);
    throw err;
  }
};
const createProject = async (newProject) => {
  try {
    const response = await axiosInstance.post("project", newProject);
    return response.data;
  } catch (err) {
    console.log("error while creating new project", err);
    throw err;
  }
};
const updateProject = async (newPost, id) => {
  try {
    const response = await axiosInstance.put(`project/${id}`, newPost);
    console.log(response.data);
    return response.data;
  } catch (err) {
    console.log("error while updating project", err);
    throw err;
  }
};
const deleteProject = async (id) => {
  try {
    const response = await axiosInstance.delete(`project/${id}`);
    return response.data;
  } catch (err) {
    console.log("error while deleting project", err);
    throw err;
  }
};

const getProjectsByCharityName = async (charityName, status, category) => {
  try {
    const response = await axiosInstance.get(
      `project/search/charity?charityName=${charityName}&status=${status}&category=${category}`
    );
    return response.data;
  } catch (err) {
    console.log("error while read projects by charity name : ", err);
    throw err;
  }
};

const getProjectsByProjectTitle = async (projectName, status, category) => {
  try {
    const response = await axiosInstance.get(
      `project/search/project?projectName=${projectName}&status=${status}&category=${category}`
    );
    return response.data;
  } catch (err) {
    console.log("error while read projects by project name : ", err);
    throw err;
  }
};

export {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getProjectsByCharityName,
  getProjectsByProjectTitle,
};
