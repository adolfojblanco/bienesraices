import jwt from 'jsonwebtoken';

/**
 * Genera un ID
 */
export const genId = () => {
  return Date.now().toString(32) + Math.random().toString(32).substring(2);
};

/**
 * Generar un JWT
 */
export const generatedToken = ({ id, name }) => {
  return jwt.sign(
    {
      id,
      name,
    },
    process.env.TOKEN,
    { expiresIn: process.env.TOKEN_TIME }
  );
};
