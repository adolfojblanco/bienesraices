import { check, validationResult } from 'express-validator';
import { emailRegistro, emailResetPassword } from '../helpers/emails.js';
import bcript from 'bcrypt';
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
    csrfToken: req.csrfToken(),
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
        csrfToken: req.csrfToken(),
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
        csrfToken: req.csrfToken(),
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
  if (!user) {
    return res.render('auth/confirmar-cuenta', {
      title: 'Error al confirmar cuenta',
      message: 'Hubo un error al confirmar tu cuenta, intenta de nuevo',
      error: true,
    });
  }

  //* Si el usuario existe
  user.token = null;
  user.confirm = true;
  await user.save();

  return res.render('auth/confirmar-cuenta', {
    title: 'Cuenta Confirmada',
    message: 'Has confirmado correctamente tu cuenta',
  });
};

/**
 * Funcion para restablecer la contraseña
 * Muestra el formulario
 */
export const restorePassword = (req, res) => {
  res.render('auth/restore-password.pug', {
    title: 'Recupera tu acceso',
    csrfToken: req.csrfToken(),
  });
};

/**
 * Reestablecer la contraseña
 */
export const resetPasword = async (req, res) => {
  await check('email').isEmail().withMessage('El email es requerido').run(req);
  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    //* Errorres
    return res.render('auth/restore-password', {
      title: 'Recupera tu acceso',
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
    });
  }

  //* Comprobamos que exita el email

  const { email } = req.body;
  const usuario = await User.findOne({ where: { email } });

  if (!usuario) {
    //* Errorres
    return res.render('auth/restore-password', {
      title: 'Recupera tu acceso',
      errores: [{ msg: 'Este usuario no esta registrado' }],
      csrfToken: req.csrfToken(),
    });
  }

  usuario.token = genId();
  await usuario.save();
  emailResetPassword({
    nombre: usuario.name,
    email: usuario.email,
    token: usuario.token,
  });

  return res.render('auth/confirmar-cuenta', {
    title: 'Recuperar Acceso',
    message: 'Hemos enviado un email con las inistrucciones',
  });
};

export const comprobarToken = async (req, res) => {
  const { token } = req.params;
  const usuario = await User.findOne({ where: { token } });

  if (!usuario) {
    //* Errorres
    return res.render('auth/confirmar-cuenta', {
      title: 'Recupera tu acceso',
      errores: [{ msg: 'Hubo un error al validaar la información, intentalo de nuevo' }],
      csrfToken: req.csrfToken(),
    });
  }

  //* Mostrar formulario para cambiar la contraseña
  res.render('auth/reset-password', {
    title: 'Recupera tu acceso',
    csrfToken: req.csrfToken(),
  });
};

/**
 *  Cambiar contraseña
 * /usuario/olvide-password/:token 
 */
export const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  await check('password')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener minimo 6 caracteres')
    .run(req);

  let resultado = validationResult(req);

  if (!resultado.isEmpty()) {
    //* Errorres
    return res.render('auth/restore-password', {
      title: 'Recupera tu contraseña',
      errores: resultado.array(),
      csrfToken: req.csrfToken(),
    });
  }

  const usuario = await User.findOne({ where: { token } });

  const salt = await bcript.genSalt(10);
  usuario.password = await bcript.hash(password, salt);
  usuario.token = null;
  usuario.save;

  res.render('auth/confirmar-cuenta', {
    title: 'Restablecido Correctamente',
    message: 'Se restablecio la contraseña correctamente',
  });
};
