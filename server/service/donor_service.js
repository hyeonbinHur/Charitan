import donorRepository from "../repository/donor_repository.js";

/**
 * sample auth api
 */
const signInUser = async (email) => {
  try {
    console.log(email);
    const user = await donorRepository.findOneByEmail(email);
    // await setUser(user[0].user_id, user[0].user_name);
    return user;
  } catch (err) {
    throw new Error("Failed to read data");
  }
};
export default { signInUser };
