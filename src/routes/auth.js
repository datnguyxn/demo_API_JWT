import express from 'express';
import AuthController from "../controllers/AuthController.js";
import {verifyToken} from "../middleware/checkUser.js";

const router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.requestRefreshToken);
router.post('/logout', verifyToken, AuthController.logoutUser);

export default router;