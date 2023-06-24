const { promisify } = require('util');
const jwt = require('jsonwebtoken');

const User = require('../models/user.model');

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    res.status(401).json({
      status: 'Error',
      mesagge: 'No estas logueado porfavor accede',
    });
  }

  const decoded = await promisify(jwt.verify)(
    token,
    process.env.SECRET_JWT_SEED,
  );

  const user = await User.findOne({
    where: {
      id: decoded.id,
      status: true,
    },
  });

  if (!user) {
    res.status(401).json({
      status: 'Error',
      mesagge: 'The owner of this token it not longer available',
    });
  }

  req.sessionUser = user;
  next();
};

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.sessionUser.role)) {
      res.status(403).json({
        status: 'Error',
        mesagge: 'You do not have permission to perfom this action.!',
      });
    }

    next();
  };
};
