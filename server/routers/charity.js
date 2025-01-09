import express from "express";
import api from "../controller/charity_controller.js";

const router = express.Router();

router.get("/charity", api.get_charities); //read all posts with titles
router.get("/charity/country", api.get_charities_by_country); //read all posts with titles
router.get("/charity/:id", api.get_charity); // read a specific post
router.post("/charity", api.create_charity); // create new post
router.put("/charity/:id", api.update_charity); // update post
router.delete("/charity/:id", api.delete_charity); // delete post

// router.delete("/charity/project/:id", api.delete_charity); // delete post

/**
 * simple test api for auth
 */

router.post("/signin/charity", api.signin_charity)


export default router;
