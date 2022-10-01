import express from "express";
import SearchController from "../controller/SearchController.js";

const router = express.Router();
router.get("/text/:input", SearchController.Searching);

export default router;
