import charityService from "../service/charity_service.js";
const get_tests = async (req, res) => {
  try {
    const tests = await charityService.readAllTest();
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const get_test = async (req, res) => {
  try {
    const id = req.params.id;
    const tests = await charityService.readTest(id);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const create_test = async (req, res) => {
  try {
    const { name } = req.body;
    const tests = await charityService.createTest(name);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const update_test = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const tests = await charityService.updateTest(id, name);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};
const delete_test = async (req, res) => {
  try {
    const id = req.params.id;
    const tests = await charityService.deleteTest(id);
    res.json(tests);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export default { get_tests, get_test, create_test, delete_test, update_test };
