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
    return res.status(401).json({
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
   return res.status(401).json({
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
      return res.status(403).json({
        status: 'Error',
        mesagge: 'You do not have permission to perfom this action.!',
      });
    }

    next();
  };
};

exports.protectAccountOwner = async (req, res, next) => {
  const { user, sessionUser } = req;

  if (user.id !== sessionUser.id) {
    return next(new AppError('You do not own this account.', 401));
  }

 next();
};