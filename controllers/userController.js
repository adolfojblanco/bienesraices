import { check, validationResult } from 'express-validator';
import { emailRegistro } from '../helpers/emails.js';
import { genId } from '../helpers/tokens.js';
import { User } from '../models/User.js';

export const login = (req, res) => {
  res.render('auth/login.pug', {
    autenticated: false,
    title: 'Inciar Sesión',
  });
};

/**
 * Muestra el formulario de registro
 */
export const formRegister = (req, res) => {
  res.render('auth/register.pug', {
    title: 'Crear Cuenta',
  });
};

/**
 * Registro de nuevo usuario
 */
export const register = async (req, res) => {
  try {
    //* Validación del formulario
    await check('name').notEmpty().withMessage('El nombre es requerido').run(req);
    await check('email').isEmail().withMessage('El email es requerido').run(req);

    await check('password')
      .isLength({ min: 6 })
      .withMessage('La contraseña debe tener minimo 6 caracteres')
      .run(req);

    //TODO: Password check
    // await check('password_repeat')
    //   .equals('password')
    //   .withMessage('Las contraseñas no coinciden')
    //   .run(req);

    let resultado = validationResult(req);

    if (!resultado.isEmpty()) {
      //* Errorres
      return res.render('auth/register', {
        title: 'Crear Cuenta',
        errores: resultado.array(),
        user: {
          name: req.body.name,
          email: req.body.email,
        },
      });
    }

    //* Verificar que el usuario no exista
    const { email, name, password } = req.body;
    const existeUsuario = await User.findOne({
      where: { email },
    });

    if (existeUsuario) {
      //* Errorres
      return res.render('auth/register', {
        title: 'Crear Cuenta',
        errores: [{ msg: 'El usuario ya esta registrado' }],
        user: {
          name: req.body.name,
          email: req.body.email,
        },
      });
    }

    //* Guardar el usuario en la bd.
    const usuario = await User.create({ name, email, password, token: genId() });
    res.render('templates/message', {
      title: 'Cuenta Creada Correctamente',
      message: 'Hemos enviado un email de confirmación',
    });

    //* Envio de email al usuario
    emailRegistro({
      nombre: usuario.name,
      email: usuario.email,
      token: usuario.token,
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Funcion que compruba una cuenta
 */
export const confirmarCuenta = async (req, res) => {
  const { token } = req.params;
  //* Verificar si el token es valido
  const user = await User.findOne({ where: { token } });

  console.log(user)


};

/**
 * Funcion para restablecer la contraseña
 */
export const restorePassword = (req, res) => {
  res.render('auth/restore-password.pug', {
    title: 'Recupera tu acceso',
  });
};
