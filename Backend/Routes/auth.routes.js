import express from 'express';
import { login, logout, signUpUser } from '../controllers/auth.controller.js';

const router = express.Router();


router.post('/signUp', signUpUser);
router.post('/login', login);
router.post('/logout', logout);



export default router;