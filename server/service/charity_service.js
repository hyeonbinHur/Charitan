import charityRepository from "../repository/charity_repository.js";

const readAllCharities = async () => {
  try {
    const tests = await charityRepository.findAll();
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const readCharity = async (id) => {
  try {
    const tests = await charityRepository.findOne(id);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const createCharity = async (newCharity) => {
  try {
    const tests = await charityRepository.createOne(newCharity);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const updateCharity = async (id, updatedCharity) => {
  try {
    const tests = await charityRepository.updateOne(id, updatedCharity);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
const deleteCharity = async (id) => {
  try {
    const tests = await charityRepository.deleteOne(id);
    return tests;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};

export default {
  readAllCharities,
  readCharity,
  createCharity,
  updateCharity,
  deleteCharity,
};
