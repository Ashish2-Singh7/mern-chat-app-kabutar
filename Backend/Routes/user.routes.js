import express from 'express';
import protectRoute from "../Middleware/protectRoute.js";
import { getUsersForSidebar, updateUserProfile } from '../controllers/user.controller.js'

const router = express.Router();

router.get("/", protectRoute, getUsersForSidebar);
router.post("/update", protectRoute, updateUserProfile);


export default router;