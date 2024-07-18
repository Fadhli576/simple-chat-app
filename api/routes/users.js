import express from "express";
var router = express.Router();
import userController from "../controllers/user.js";

router.post('/api/register', userController.register)
router.post('/api/login', userController.login);

export default router