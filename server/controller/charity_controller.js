import charityService from "../service/charity_service.js";

const get_charities = async (req, res) => {
  try {
    const tests = await charityService.readAllCharities();
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_charity = async (req, res) => {
  try {
    const id = req.params.id;
    const tests = await charityService.readCharity(id);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const create_charity = async (req, res) => {
  try {
    const {
      organization_name,
      description,
      category,
      password,
      avatar,
      createdAt,
      updatedAt,
      country,
    } = req.body;
    const newCharity = {
      organization_name,
      description,
      category,
      password,
      avatar,
      createdAt,
      updatedAt,
      country,
    };
    const tests = await charityService.createCharity(newCharity);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const update_charity = async (req, res) => {
  try {
    const id = req.params.id;
    const {
      organization_name,
      description,
      category,
      password,
      avatar,
      createdAt,
      updatedAt,
      country,
    } = req.body;
    const updatedCharity = {
      organization_name,
      description,
      category,
      password,
      avatar,
      createdAt,
      updatedAt,
      country,
    };

    const tests = await charityService.updateCharity(id, updatedCharity);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const delete_charity = async (req, res) => {
  try {
    const id = req.params.id;
    const tests = await charityService.deleteCharity(id);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
/**
 * simple auth api
 */
const signin_charity = async (req, res) => {
  // set cache
  try {
    const { email } = req.body;
    console.log(email)
    const user = await charityService.signInUser(email);
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default {
  get_charities,
  get_charity,
  create_charity,
  update_charity,
  delete_charity,
  signin_charity,
};


