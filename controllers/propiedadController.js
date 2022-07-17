import { Category } from '../models/Category.js';
import { validationResult } from 'express-validator';
export const admin = (req, res) => {
  res.render('propiedades/admin', {
    title: 'Mis propiedades',
    barra: true,
  });
};

/**
 * Formulario nueva propiedad
 */
export const crear = async (req, res) => {
  const categories = await Category.findAll();

  res.render('propiedades/nueva-propiedad', {
    title: 'Nueva Propiedad',
    csrfToken: req.csrfToken(),
    barra: true,
    data: {},
    categories,
  });
};

export const guardar = async (req, res) => {
  const categories = await Category.findAll();

  //* Validación
  let result = validationResult(req);
  if (!result.isEmpty()) {
    res.render('propiedades/nueva-propiedad', {
      title: 'Nueva Propiedad',
      csrfToken: req.csrfToken(),
      errors: result.array(),
      barra: true,
      categories,
      data: req.body,
    });
  }

  res.render('propiedades/nueva-propiedad', {
    title: 'Nueva Propiedad',
    csrfToken: req.csrfToken(),
    barra: true,
    categories,
  });
};
