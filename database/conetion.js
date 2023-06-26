const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: process.env.DB_DIALECT,
  host: process.env.DB_HOST,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  port: process.env.DB_PORT,
  logging: false,
});

db.authenticate()
  .then((res) => console.log('Autenticada'))
  .catch((err) => console.log(err));
db.sync()
  .then((res) => console.log('sincronozada'))
  .catch((err) => console.log(err));
module.exports = { db };
