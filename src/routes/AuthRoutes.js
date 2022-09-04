import express from "express";
import AuthController from "../controller/AuthController.js";
import ProfileController from "../controller/ProfileController.js";
import verifyJWT from "../middleware/verifyJWT.js";

const router = express.Router();
router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.patch("/editProfile/:uid", verifyJWT, ProfileController.editProfile);
router.get("/getProfile/:uid", verifyJWT, ProfileController.getProfile);
router.get("/getAvatar/:aid", ProfileController.getAvatarId);

export default router;
