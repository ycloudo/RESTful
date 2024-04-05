import express from 'express';
import RestaurantController from '../controller/RestaurantController.js';

const router = express.Router();
router.get('/restaurants', RestaurantController.getRestaurants);
export default router;
