const User = require('../models/user.model');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcryptjs');

exports.findUser = async (req, res) => {
  const user = await User.findAll({
    where: {
      status: 'available',
    },
  });

  return res.json({
    mesagge: 'Felicidades',
    user,
  });
};

exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  const token = await generateJWT(user.id);

  const user = await User.create({
    name,
    email,
    password,
    role,
    token,
  });

  return res.status(200).json({
    message: 'Usuario creado exitosamente 😁😀',
    mesagge2: 'Gracias por escogernos >:D 🚑🛒🚘🏍🛵🚲',
    user,
  });
};

exports.findOneUser = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    user,
  });
};

exports.deleteOneUser = async (req, res) => {
  const { status } = req.body;

  const user = req.user;

  user.update({ status: 'desativado' });

  res.status(200).json({
    message: `Usuario cancelado exitosamente 😒☠☠`,
    user,
  });
};

exports.updateOneUser = async (req, res) => {
  const { name, email } = req.body;

  const user = req.user;

  user.update({ name, email });

  res.status(200).json({
    message: `Usuario completada exitosamente`,
    mesagge2: '😎🐱‍🏍🐱‍🐉 Att Arley Hurtado difruta tu moto 🏍🛵🏍',
    user,
  });
};

exports.login = async (req, res, next) => {
  const { user } = req;
  const password = req.body.password;

  if (!(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({
      status: 'Error',
      mesagge: 'Correo o contraseña incorrecta',
    });
  }

  const token = await generateJWT(user.id);

  res.status(200).json({
    status: 'Correcto',
    token,
    userId: user.id,
    userName: user.name,
    userR: user.role,
    userS: user.status,
  });
};
