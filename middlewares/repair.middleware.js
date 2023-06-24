const Repair = require('../models/repairs.model');
exports.exisRepair = async (req, res, next) => {
  const { id } = req.params;

  const repair = await Repair.findOne({
    where: {
      status: 'pending',
      id,
    },
  });

  if (!repair) {
    return res.json({
      mesagge: 'Usuario cancelado o no existe lo sentimos 🛠⚒',
      mesagge2: 'Me estas intentando cargar el servidor? 😤😡',
    });
  }

  req.repair = repair;
  next();
};
