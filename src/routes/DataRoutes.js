import express from "express";
import DataController from "../controller/DataController.js";

const router = express.Router();
router.get("/allAvatar", DataController.getAvatars);

export default router;
