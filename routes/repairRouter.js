const express = require('express');
const repairControllers = require('../controllers/repair.controllers');
const router = express.Router();
const validationMiddleware = require('../middlewares/validation.middleware');
const repairMiddleware = require('../middlewares/repair.middleware');
const autMiddleware = require('../middlewares/aut.middleware');

router.use(autMiddleware.protect);

router
  .route('/')
  .get(autMiddleware.restrictTo('employee'), repairControllers.findRepairs)
  .post(validationMiddleware.createRepair, repairControllers.createRepairs);

router
  //.use('/:id', repairMiddleware.exisRepair).
  .route('/:id')
  .get(
    autMiddleware.restrictTo('employee'),
    repairMiddleware.exisRepair,
    repairControllers.findOneRepairs,
  )
  .delete(repairMiddleware.exisRepair, repairControllers.cancelleRepairs)
  .patch(repairMiddleware.exisRepair, repairControllers.completeRepairs);

module.exports = router;
