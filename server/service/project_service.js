import projectRepository from "../repository/project_repository.js";

const readAllProjects = async () => {
  try {
    const tests = await projectRepository.findAll();
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readProject = async (id) => {
  try {
    const tests = await projectRepository.findOne(id);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

const readProjectByStatus = async (status) => {
  try {
    const tests = await projectRepository.findOneByStatus(status);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

const readProjectByCharityName = async (charityName) => {
  try {
    const tests = await projectRepository.findOneByCharityName(charityName);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

const readProjectByProjectName = async (projectName) => {
  try {
    const tests = await projectRepository.findOneByProjectName(projectName);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

const readProjectByCharity = async (id) => {
  try {
    const tests = await projectRepository.findOneByCharity(id);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

const createProject = async (newProject) => {
  try {
    console.log("new Project from service");
    console.log(newProject);
    const tests = await projectRepository.createOne(newProject);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

const updateProject = async (id, updatedProject) => {
  try {
    const tests = await projectRepository.updateOne(id, updatedProject);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

const deleteProject = async (id) => {
  try {
    const tests = await projectRepository.deleteOne(id);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

export default {
  readAllProjects,
  readProject,
  readProjectByStatus,
  readProjectByCharityName,
  readProjectByProjectName,
  readProjectByCharity,
  createProject,
  updateProject,
  deleteProject,
};
