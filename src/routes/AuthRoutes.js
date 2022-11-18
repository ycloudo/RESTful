import express from 'express';
import AuthController from '../controller/AuthController.js';
import UserController from '../controller/UserController.js';
import verifyJWT from '../middleware/verifyJWT.js';

const router = express.Router();
router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.patch('/editProfile/:uid', verifyJWT, UserController.editProfile);
router.get('/getProfile/:uid', verifyJWT, UserController.getProfile);
router.get('/getAvatar/:aid', UserController.getAvatarId);
router.get('/getFavor/:uid', verifyJWT, UserController.getFavor);
router.get('/getDrawerInfo/:uid', verifyJWT, UserController.getDrawerInfo);
router.post('/isTokenValid', AuthController.isTokenValid);
router.post('/setFavor', verifyJWT, UserController.setFavor);
router.post('/setsetting', verifyJWT, UserController.setSetting);

export default router;
