import jwt from 'jsonwebtoken';
import { User } from '../models/index.js';

// Usuario autenticado
export const auth = async (req, res, next) => {
  //* Verificar token
  const { _token } = req.cookies;

  // Verificamos si tenemos token

  if (!_token) {
    return res.redirect('/usuario/login');
  }

  // Comprobar token
  try {
    const decoded = jwt.verify(_token, process.env.TOKEN);
    const user = await User.scope('eliminarPassword').findByPk(decoded.id);
    if (user) {
      req.user = user;
    } else {
      return res.redirect('/usuario/login');
    }
    return next();
  } catch (error) {
    return res.clearCookie('_token').redirect('/usuario/login');
  }
};
