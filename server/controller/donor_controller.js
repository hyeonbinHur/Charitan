import donorService from "../service/donor_service.js";
import dotenv from "dotenv";
dotenv.config();

const signin_donor = async (req, res) => {
  // set cache
  console.log(process.env.DB_HOST);
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
