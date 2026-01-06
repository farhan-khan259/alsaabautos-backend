const express = require('express');
const paymentController = require('../Controller/PaymentController');
const { protect } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

router.use(protect); // Protect all routes

router
  .route('/')
  .get(paymentController.getAllPayments)
  .post(paymentController.createPayment);

router
  .route('/:id')
  .get(paymentController.getPayment)
  .patch(paymentController.updatePayment)
  .delete(paymentController.deletePayment);

module.exports = router;
