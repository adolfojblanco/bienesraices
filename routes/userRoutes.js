import express from 'express';
const router = express.Router();

import { login, register, restorePassword } from '../controllers/userController.js';

//* Auth Routes
router.get('/login', login);
router.get('/registrar', register);
router.get('/restablecer', restorePassword);

//* User Routes

export default router;
