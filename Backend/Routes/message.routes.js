import express from 'express';
import { sendMessage, getMessages, updateConversation, getConversation } from '../controllers/messages.controller.js';
import protectRoute from '../Middleware/protectRoute.js'

const router = express.Router();

router.post('/send/:id', protectRoute, sendMessage);
router.get('/:id', protectRoute, getMessages);
router.post('/:id', protectRoute, updateConversation);
router.get('/conversation/:id', protectRoute, getConversation);

export default router;