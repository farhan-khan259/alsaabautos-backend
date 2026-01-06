const express = require('express');
const expenseController = require('../Controller/ExpenseController');
const { protect } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

router.use(protect); // Protect all routes

router
  .route('/')
  .get(expenseController.getAllExpenses)
  .post(expenseController.createExpense);

router
  .route('/:id')
  .get(expenseController.getExpense)
  .patch(expenseController.updateExpense)
  .delete(expenseController.deleteExpense);

module.exports = router;
