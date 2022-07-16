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
  userLogin,
} from '../controllers/userController.js';

//* Auth Routes
router.get('/login', login); // Mostrar el formulario
router.post('/login', userLogin); // Inicio de sesion de usuario


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
