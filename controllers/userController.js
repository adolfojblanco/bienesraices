export const login = (req, res) => {
  res.render('auth/login.pug', {
    autenticated: false,
  });
};

export const register = (req, res) => {
  res.render('auth/register.pug');
};
