const Repair = require('../models/repairs.model');
const AppError = require('../utils/appError');
exports.exisRepair = async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
  });

  if (!repair) {
    return next(new AppError('Usuario cancelado o no existe lo sentimos 🛠⚒', 404))
  }

  req.repair = repair;
  next();
};
