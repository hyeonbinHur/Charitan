import adminService from "../service/admin_service.js";

const signin_admin = async (req, res) => {
  // set cache
  try {
    const { email } = req.body;
    const user = await adminService.signInUser(email);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
export default {
  signin_admin,
};
