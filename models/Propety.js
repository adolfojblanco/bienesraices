import { DataTypes } from 'sequelize';
import bcrypt from 'bcrypt';
import db from '../config/db.js';

export const Property = db.define('propierties', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  rooms: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  parking: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
  },
  baths: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING(70),
    allowNull: false,
  },
  lat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lng: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
