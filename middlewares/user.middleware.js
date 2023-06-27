const User = require('../models/user.model');
const AppError = require('../utils/appError');


exports.exisUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      status: 'available',
      id,
    },
  });

  if (!user) {
    return next(new AppError('El usuario no pude ser creado 🛠⚒', 404))
  }

  req.user = user;
  next();
};

exports.existUserEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });

  if (!user) {
    
    return next(new AppError('El usuario con el email ${email} no se encontro', 404))
  }
  req.user = user;
  next();
};
