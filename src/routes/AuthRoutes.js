import express from "express";
import AuthController from "../controller/AuthController.js";
import ProfileController from "../controller/ProfileController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.patch("/editProfile/:uid", verifyJWT, ProfileController.editProfile);

export default router;
