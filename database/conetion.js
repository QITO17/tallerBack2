const { Sequelize } = require('sequelize');

const db = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'root',
  database: 'citas_motos',
  logging: false,
});

db.authenticate()
  .then((res) => console.log('Autenticada'))
  .catch((err) => console.log(err));
db.sync()
  .then((res) => console.log('sincronozada'))
  .catch((err) => console.log(err));
module.exports = { db };
