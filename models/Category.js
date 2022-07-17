import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

export const Category = db.define('categories', {
  name: {
    type: DataTypes.STRING(30),
    allowNull: false,
  },
});
