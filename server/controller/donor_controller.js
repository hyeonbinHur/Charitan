import donorService from "../service/donor_service.js";

const signin_donor = async (req, res) => {
  // set cache
  try {
    const { email } = req.body;
    const user = await donorService.signInUser(email);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default {
  signin_donor,
};
