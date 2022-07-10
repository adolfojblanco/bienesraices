export const login = (req, res) => {
  res.render('auth/login.pug', {
    autenticated: false,
    title: 'Inciar Sesión',
  });
};

export const register = (req, res) => {
  res.render('auth/register.pug', {
    title: 'Crear Cuenta',
  });
};

export const restorePassword = (req, res) => {
  res.render('auth/restore-password.pug', {
    title: 'Recupera tu acceso',
  });
};
