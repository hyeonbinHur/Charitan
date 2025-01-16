import projectRepository from "../repository/project_repository.js";
import charityRepository from "../repository/charity_repository.js";
import {
  setProjectFromCache,
  getProjectFromCache,
  deleteProjectFromCache,
  updateProjectFromCache,
} from "../generator/redis_generator.js";

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
    const cacheVal = await getProjectFromCache(id);
    const tests = await projectRepository.findOne(id);
    if (Object.keys(cacheVal).length === 0) {
      console.log("try to store data in cache");
      await setProjectFromCache(tests[0].project_id, tests[0]);
      console.log(tests);
      return tests;
    } else {
      console.log(tests);
      return [cacheVal];
    }
    return tests;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to read data");
  }
};
const readProjectByCharityId = async (id, status) => {
  try {
    const tests = await projectRepository.findAllByCharity(id, status);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readHaltedProject = async () => {
  try {
    const tests = await projectRepository.findHaltedAll();
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readProjectByOnlyStatus = async (status) => {
  try {
    const tests = await projectRepository.findMayByStatus(status);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readProjectByStatus = async (status, category, country) => {
  try {
    const charities = await charityRepository.findManyByCountry(country);
    if (charities.length > 0) {
      const charitiesId = charities.map((item) => item.charity_id);
      const tests = await projectRepository.findOneByStatus(
        status,
        category,
        charitiesId
      );
      return tests;
    } else {
      return [];
    }
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readProjectByCharityName = async (
  charityName,
  status,
  category,
  country
) => {
  try {
    const charities = await charityRepository.findManyByName(charityName);
    if (charities.length > 0) {
      const charitiesId = charities.map((item) => item.charity_id);
      const tests = await projectRepository.findOneByCharityName(
        status,
        category,
        charitiesId
      );
      return tests;
    } else {
      return [];
    }
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readProjectByProjectName = async (
  projectName,
  status,
  category,
  country
) => {
  try {
    const charities = await charityRepository.findManyByCountry(country);
    console.log(charities);
    if (charities.length > 0) {
      const charitiesId = charities.map((item) => item.charity_id);
      const tests = await projectRepository.findOneByProjectName(
        projectName,
        status,
        category,
        charitiesId
      );
      return tests;
    } else {
      return [];
    }
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readProjectByCountry = async (country, status, category) => {
  try {
    const charities = await charityRepository.findManyByCountry(country);
    if (charities.length > 0) {
      const tests = await projectRepository.findManyByCountry(
        charities,
        status,
        category
      );
      return tests;
    } else {
      return [];
    }
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
    console.log(newProject);
    const tests = await projectRepository.createOne(newProject);
    return tests;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to read data");
  }
};
const updateProject = async (id, updatedProject) => {
  try {
    const tests = await projectRepository.updateOne(id, updatedProject);
    await deleteProjectFromCache(id);
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

const updateProjectComplete = async (id) => {
  try {
    const test = await projectRepository.updateCompleteOne(id);
    return test;
  } catch (err) {
    throw new Error("Failed while update project to completed");
  }
};

const updateProjectDonation = async (id, funding, is_completed) => {
  try {
    const test = await projectRepository.updateOneDonation(
      id,
      funding,
      is_completed
    );

    const cache = await projectRepository.findOne(id);
    await deleteProjectFromCache(id);
    return test;
  } catch (err) {
    throw new Error("Failed while update project to complete2d");
  }
};

export default {
  readAllProjects,
  readProject,
  readProjectByStatus,
  readHaltedProject,
  readProjectByCharityName,
  readProjectByProjectName,
  readProjectByCountry,
  readProjectByCharity,
  createProject,
  updateProject,
  deleteProject,
  updateProjectComplete,
  readProjectByOnlyStatus,
  updateProjectDonation,
  readProjectByCharityId,
};
