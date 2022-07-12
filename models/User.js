import { DataTypes } from 'sequelize';
import bcript from 'bcrypt';
import db from '../config/db.js';

//* Modelo de usuarios

export const User = db.define(
  'users',
  {
    name: {
      type: DataTypes.STRING(60),
      allowNull: false,
      require: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      require: true,
    },
    email: {
      type: DataTypes.STRING(60),
      allowNull: false,
      require: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      require: true,
    },
    token: {
      type: DataTypes.STRING,
    },
    confirm: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    hooks: {
      beforeCreate: async function (user) {
        const salt = await bcript.genSalt(10);
        user.password = await bcript.hash(user.password, salt);
      },
    },
  }
);
