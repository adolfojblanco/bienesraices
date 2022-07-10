import express from 'express';
const router = express.Router();

import { login, register } from '../controllers/userController.js';

//* Auth Routes
router.get('/auth', login);
router.get('/register', register);

//* User Routes

export default router;
