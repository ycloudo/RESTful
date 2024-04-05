import express from 'express';
import AuthController from '../controller/AuthController.js';
import UserController from '../controller/UserController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();
router.post('/users', AuthController.register);
router.post('/login', AuthController.login);
router.patch('/users/:uid', verifyJWT, UserController.editProfile);
router.get('/users/:uid', verifyJWT, UserController.getProfile);
router.get('/favors/:uid', verifyJWT, UserController.getFavor);
router.post('/favors', verifyJWT, UserController.setFavor);
router.patch('/settings/:uid', verifyJWT, UserController.setSetting);
router.get('/settings/:uid', UserController.getSetting);
export default router;
