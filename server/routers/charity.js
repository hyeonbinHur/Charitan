const express = require("express");
const router = express.Router();
const api = require("../handler/charity-handler.js");

router.get("/charity", api.get_charities); //read all posts with titles
router.get("/charity/:id", api.get_charity); // read a specific post
// router.get("/charity/user/:id", api.get_charitys_by_charity); // read all posts which written by an user
router.post("/charity", api.create_charity); // create new post
router.put("/charity/:id", api.update_charity); // update post
router.delete("/charity/:id", api.delete_charity); // delete post

module.exports = router;
