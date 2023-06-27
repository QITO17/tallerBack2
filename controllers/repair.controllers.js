const Repair = require('../models/repairs.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findRepairs = async (req, res, next) => {
  const repair = await Repair.findAll({
    where: {
      status: 'pending',
    },
    include: [
      {
        model: User,
      },
    ],
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

exports.createRepairs = catchAsync(async (req, res, next) => {
  const { date, idUser, descripcion, motorsNumber } = req.body;
  const { id } = req.params;

  const user = await User.findAll({
    where: {
      id: idUser,
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
  return res.status(200).json({
    message: 'Usuario creado exitosamente 😁😀',
    mesagge2: 'Gracias por escogernos >:D 🚑🛒🚘🏍🛵🚲',
    repair,
  });
});

exports.completeRepairs = catchAsync(async (req, res, next) => {
  const repair = req.repair;

  repair.update({ status: 'complete' });

  res.status(200).json({
    message: `Reparación completada exitosamente`,
    mesagge2: '😎🐱‍🏍🐱‍🐉 Att Arley Hurtado difruta tu moto 🏍🛵🏍',
  });
});

exports.cancelleRepairs = catchAsync(async (req, res, next) => {
  const repair = req.repair;

  repair.update({ status: 'cancelled' });

  res.status(200).json({
    message: `Reparación cancelada exitosamente 😒☠☠`,
  });
});
