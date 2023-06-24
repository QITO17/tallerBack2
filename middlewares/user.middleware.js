const User = require('../models/user.model');

exports.exisUser = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      status: 'available',
      id,
    },
  });

  if (!user) {
    return res.json({
      mesagge: 'El usuario no pude ser creado 🛠⚒',
    });
  }

  req.user = user;
  next();
};

exports.existUserEmail = async (req, res, next) => {
  const { email } = req.body;

  const user = User.findOne({
    where: {
      email: email.toLowerCase(),
      status: 'available',
    },
  });

  if (!user) {
    return res.status(404).json({
      status: `Error`,
      mesagge: `El usuario con el email ${email} no se encontro`,
    });
  }
  req.user = user;
  next();
};
