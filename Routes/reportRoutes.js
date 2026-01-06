const express = require('express');
const reportController = require('../Controller/ReportController');
const { protect } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

router.use(protect); // Protect all routes

router
  .route('/')
  .get(reportController.getAllReports)
  .post(reportController.createReport);

router
  .route('/:id')
  .get(reportController.getReport)
  .patch(reportController.updateReport)
  .delete(reportController.deleteReport);

module.exports = router;
