import express from 'express';
import { registerUser, loginUser, getUserProfile, updateUserProfile } from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/auth.middleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getUserProfile);
router.put('/profile', verifyToken, updateUserProfile);

export default router;