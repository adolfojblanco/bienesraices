import express from 'express';
const router = express.Router();

import {
  comprobarToken,
  confirmarCuenta,
  formRegister,
  login,
  nuevoPassword,
  register,
  resetPasword,
  restorePassword,
} from '../controllers/userController.js';

//* Auth Routes
router.get('/login', login);
router.get('/registrar', formRegister);
router.post('/registrar', register);
router.get('/confirmar/:token', confirmarCuenta);

router.get('/restablecer', restorePassword);
router.post('/restablecer', resetPasword);

//* Cambio de contraseña
router.get('/olvide-password/:token', comprobarToken)
router.post('/olvide-password/:token', nuevoPassword)


//* User Routes

export default router;
