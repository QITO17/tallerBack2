const express = require('express');
const userControllers = require('../controllers/user.controllers');
const router = express.Router();
const validationMiddleware = require('../middlewares/validation.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const autMiddleware = require('../middlewares/aut.middleware');

router
  .route('/')
  .get(userControllers.findUser)
  .post(validationMiddleware.createUser, userControllers.createUser);

router.post('/login', userMiddleware.existUserEmail, userControllers.login);

router.use(autMiddleware.protect);

router
  //.use('/:id', userMiddleware.exisUser)
  .route('/:id')
  .get(userMiddleware.exisUser, userControllers.findOneUser)
  .delete(userMiddleware.exisUser, userControllers.deleteOneUser)
  .patch(userMiddleware.exisUser, userControllers.updateOneUser);

module.exports = router;
