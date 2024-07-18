var router = express.Router();
import express from "express"
import {chatController, authenticateToken} from "../controllers/chat.js"

/* GET home page. */
router.get('/api/chat', authenticateToken, chatController.chat);
router.get('/api/user', authenticateToken, chatController.user)
router.get('/api/messages/:sender/:receiver', chatController.message)

export default router