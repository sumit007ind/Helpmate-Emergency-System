import express from 'express';
import {
  register,
  login,
  getMe,
  logout
} from '../controllers/authcontroller.js';
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', authenticate, getMe);
router.post('/logout', authenticate, logout);

export default router;