import express from "express";
import RestaurantController from "../controller/RestaurantController.js";

const router = express.Router();
router.get("/info/:rid", RestaurantController.ResInfo);
router.get("/all", RestaurantController.AllInfo);
router.get("/getRestarant/:tag", RestaurantController.infoByTag);

export default router;
