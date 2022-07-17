export const admin = (req, res) => {
  res.render('propiedades/admin', {
    title: 'Mis propiedades',
    barra: true,
  });
};

/**
 * Formulario nueva propiedad
 */
export const crear = (req, res) => {
  res.render('propiedades/nueva-propiedad', {
    title: 'Nueva Propiedad',
    barra: true,
  });
};
