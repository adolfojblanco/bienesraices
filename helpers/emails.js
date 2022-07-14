import nodemailer from 'nodemailer';

export const emailRegistro = async (datos) => {
  const transport = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const { email, nombre, token } = datos;

  await transport.sendMail({
    from: 'Bienes Raices',
    to: email,
    subject: 'Confirma tu cuenta en BinesRaices.com',
    text: 'Confirma tu cuenta en BienesRaices.com',
    html: `
      <p>Hola ${nombre}, confirma tu cuenta</p>
      <p>Tu cuenta esta lista, solo debes confirmarla en este enlace <a href="">Confirmar Cuenta</a> </p>
      <p>Si no creaste esta cuenta, ignora este mensaje</p>
    `,
  });
};
