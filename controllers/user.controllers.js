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

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  const token = await generateJWT(user.id);

  return res.status(200).json({
    message: 'Usuario creado exitosamente 😁😀',
    mesagge2: 'Gracias por escogernos >:D 🚑🛒🚘🏍🛵🚲',
    user,
    token,
  });
};

exports.findOneUser = async (req, res) => {
  const user = req.user;

  return res.status(200).json({
    user,
  });
};

exports.deleteOneUser = async (req, res) => {
  const user = req.user;

  const { id } = req.sessionUser;

  if (user.id === id) {
    user.update({ status: 'disable' });
  } else {
    res.status(400).json({
      message: `No es posible eliminar el usuario con el id ${user.id} desde el usuario con el id ${id}`,
      user,
    });
  }

  res.status(200).json({
    message: `Usuario cancelado exitosamente 😒☠☠`,
    user,
  });
};

exports.updateOneUser = async (req, res) => {
  const { name, email } = req.body;

  const user = req.user;

  const { id } = req.sessionUser;

  if (user.id === id) {
    user.update({ name, email });
  } else {
    res.status(400).json({
      message: `No es posible actualizar el usuario con el id ${user.id} desde el usuario con el id ${id}`,
      user,
    });
  }

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
