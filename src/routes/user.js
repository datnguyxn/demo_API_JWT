import express from "express";
import UserController from "../controllers/UserController.js";
import { verifyToken, verifyTokenAndAdmin } from "../middleware/checkUser.js";
const router = express.Router();

router.get('/', verifyToken, UserController.getAllUsers);
router.delete('/:id', verifyTokenAndAdmin, UserController.deleteUser);

export default router;