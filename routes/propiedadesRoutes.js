import express from 'express';
const router = express.Router();
import { body } from 'express-validator';

import { addImage, admin, crear, guardar } from '../controllers/propiedadController.js';
import { auth } from '../middleware/auth.js';

router.get('/mis-propiedades', auth, admin);

router.get('/nueva-propiedad', auth, crear);

router.post(
  '/nueva-propiedad',
  auth,
  body('title').notEmpty().withMessage('El titulo del anuncio es requerido'),
  body('description')
    .notEmpty()
    .withMessage('El anuncio debe tener una descripción')
    .isLength({ max: 200 })
    .withMessage('La descripción es muy larga'),
  body('rooms').isNumeric().withMessage('El numero de habitaciones es requerido'),
  body('category').isNumeric().withMessage('Selecciona una categoira'),
  body('price').notEmpty().withMessage('El anuncio debe tener un precio'),
  body('lat').notEmpty().withMessage('Ubica la propiedad en el mapa'),
  guardar
);

router.get('/agregar-imagen/:id', addImage);

export default router;
