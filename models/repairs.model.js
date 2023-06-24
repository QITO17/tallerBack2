const { db } = require('../database/conetion');
const { DataTypes } = require('sequelize');

const Repair = db.define('repair', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  motorsNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'pending',
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  idUser: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
});

module.exports = Repair;
