import express from 'express';
import AuthController from "../controllers/AuthController.js";
import {verifyToken} from "../middleware/checkUser.js";
import passport from "passport";
import '../middleware/passport.js';


const router = express.Router();

router.post('/register', AuthController.registerUser);
router.post('/login', AuthController.loginUser);
router.post('/refresh', AuthController.requestRefreshToken);
router.post('/logout', verifyToken, AuthController.logoutUser);
router.post('/test', passport.authenticate('jwt', {session: false}), AuthController.secret);
router.post('/google', passport.authenticate('google-plus-token', {session: false}), AuthController.googleOAuth);

export default router;