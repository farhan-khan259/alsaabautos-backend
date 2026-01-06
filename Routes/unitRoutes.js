const express = require('express');
const unitController = require('../Controller/UnitController');
const { protect } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

router.use(protect); // Protect all routes

router
  .route('/')
  .get(unitController.getAllUnits)
  .post(unitController.createUnit);

router
  .route('/:id')
  .get(unitController.getUnit)
  .patch(unitController.updateUnit)
  .delete(unitController.deleteUnit);

module.exports = router;
