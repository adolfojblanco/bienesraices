import express from 'express';
const router = express.Router();

import { admin, crear } from '../controllers/propiedadController.js';

router.get('/mis-propiedades', admin);
router.get('/nueva-propiedad', crear);

export default router;
