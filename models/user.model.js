const { db } = require('../database/conetion');
const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const User = db.define(
  'users',
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.ENUM('client', 'employee'),
      defaultValue: 'client',
    },
    status: {
      type: DataTypes.ENUM('available', 'disable'),
      allowNull: false,
      defaultValue: 'available',
    },
  },
  {
    hooks: {
      beforeCreate: async (user) => {
        const salt = await bcrypt.genSalt(10);
        const secretPassword = await bcrypt.hash(user.password, salt);
        user.password = secretPassword;
      },
    },
  },
);

module.exports = User;
