import Sequelize from 'sequelize';
import dotenv from 'dotenv';
dotenv.config({ path: '.env' });

//* Configuración de la base de datos

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD_DB,
  {
    host: process.env.HOST_DB,
    port: process.env.HOST_PORT,
    dialect: process.env.DB_DIALEC,
    define: {
      timestamps: true,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
    operatorAliases: false,
  }
);

export default db;
