import express from 'express'
import { isAuthenticated } from '../middlewares/auth.middleware.js';
import { getMessage, sendMessage } from '../controllers/message.controller.js';


const router = express.Router();
router.post('/send/:reciverId', isAuthenticated, sendMessage);
router.get('/get-message/:otherParticipentsID', isAuthenticated, getMessage);


export default router;