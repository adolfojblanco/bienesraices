import express from 'express';
const router = express.Router();
import { body } from 'express-validator';

import { admin, crear, guardar } from '../controllers/propiedadController.js';

router.get('/mis-propiedades', admin);
router.get('/nueva-propiedad', crear);
router.post(
  '/nueva-propiedad',
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

export default router;
