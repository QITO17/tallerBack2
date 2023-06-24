const Repair = require('../models/repairs.model');
const User = require('../models/user.model');
const { Op } = require('sequelize');

exports.findRepairs = async (req, res) => {
  const repair = await Repair.findAll({
    where: {
      status: 'pending',
    },
  });

  if (!repair) {
    return res.json({
      mesagge: 'Usuario cancelado o no existe lo sentimos',
      mesagge2: 'Me estas intentando cargar el servidor? 😤😡',
    });
  }
  return res.json({
    repair,
  });
};

exports.findOneRepairs = async (req, res) => {
  const repair = req.repair;
  return res.json({
    repair,
  });
};

exports.createRepairs = async (req, res) => {
  try {
    const { date, idUser, descripcion, motorsNumber } = req.body;
    const { id } = req.params;

    console.log('ENTRO2');
    const user = await User.findAll({
      where: {
        idUser,
      },
    });

    if (id !== user.idUser) {
      return res.status(404).json({
        message: 'El id del usuario debe coincidir con un usuario creado ',
        mesagge2:
          'We no puedes tener un id de un usuario que no haz creado 😒🙄🙄',
      });
    }

    const repair = await Repair.create({
      date,
      idUser,
      descripcion,
      motorsNumber,
    });
    console.log('ENTRO1');
    return res.status(200).json({
      message: 'Usuario creado exitosamente 😁😀',
      mesagge2: 'Gracias por escogernos >:D 🚑🛒🚘🏍🛵🚲',
      repair,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Error de servidor 😒😒',
    });
  }
};

exports.completeRepairs = async (req, res) => {
  try {
    const repair = req.repair;

    repair.update({ status: 'complete' });

    res.status(200).json({
      message: `Reparación completada exitosamente`,
      mesagge2: '😎🐱‍🏍🐱‍🐉 Att Arley Hurtado difruta tu moto 🏍🛵🏍',
      status,
    });
  } catch (error) {
    res.status(404).json({
      message: `Error el id  no fue identificado`,
      mesagge2: 'Me estas intentando cargar el servidor? 😤😡',
    });
  }
};

exports.cancelleRepairs = async (req, res) => {
  try {
    const repair = req.repair;

    repair.update({ status: 'cancelled' });

    res.status(200).json({
      message: `Reparación cancelada exitosamente 😒☠☠`,
      status,
    });
  } catch (error) {
    res.status(404).json({
      message: `Error el id ${id} no fue identificado 🙄`,
      mesagge2: 'Me estas intentando cargar el servidor? 😤😡',
    });
  }
};
