const express = require('express');
const investorController = require('../Controller/InvestorController');
const { protect } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

router.use(protect); // Protect all routes

router
  .route('/')
  .get(investorController.getAllInvestors)
  .post(investorController.createInvestor);

router
  .route('/:id')
  .get(investorController.getInvestor)
  .patch(investorController.updateInvestor)
  .delete(investorController.deleteInvestor);

module.exports = router;
