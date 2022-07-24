import { Category, Property } from '../models/index.js';
import { validationResult } from 'express-validator';

export const admin = (req, res) => {
  res.render('propiedades/admin', {
    title: 'Mis propiedades',
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
      categories,
      data: req.body,
    });
  }

  const {
    title,
    description,
    category: categoryId,
    price,
    rooms,
    parking,
    baths,
    street,
    lat,
    lng,
  } = req.body;

  const { id: userId } = req.user;

  //* Crear un registro
  try {
    const newProperty = await Property.create({
      title,
      description,
      categoryId,
      price,
      rooms,
      parking,
      baths,
      street,
      lat,
      lng,
      userId,
      image: '',
    });

    const { id } = newProperty;
    res.redirect(`/propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};

/**
 * Agregar Imagen
 * /propiedades/agregar-imagen
 */
export const addImage = async (req, res) => {
  const { id } = req.params;

  //* Validar que la propiedad exista
  const property = await Property.findByPk(id);

  if (!property) {
    return res.redirect('/propiedades/mis-propiedades');
  }

  //* Validar que la propiedad no este publicada
  if (property.published) {
    return res.redirect('/propiedades/mis-propiedades');
  }

  //* Validar que la propiedad sea de quien visite la propiedad
  if (req.user.id.toString() !== property.userId.toString()) {
    return res.redirect('/propiedades/mis-propiedades');
  }

  res.render('propiedades/add-image', {
    title: `Agregar Imagen: ${property.title}`,
    csrfToken: req.csrfToken(),
    property,
  });
};
