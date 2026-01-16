const express = require('express');
const unitController = require('../Controller/UnitController');
const { protect } = require('../Middlewares/AuthMiddleware');
const { unitUpload } = require('../Middlewares/UploadMiddelware');

const router = express.Router();

router.use(protect); // Protect all routes

// Add logging middleware
router.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PATCH') {
    console.log('Request headers:', req.headers);
    console.log('Request body fields:', Object.keys(req.body));
  }
  next();
});

router
  .route('/')
  .get(unitController.getAllUnits)
  .post(unitUpload.any(), (req, res, next) => {
    console.log('After multer - files:', req.files ? req.files.length : 0);
    if (req.files) {
      console.log('File details:', req.files.map(f => ({ fieldname: f.fieldname, originalname: f.originalname, size: f.size })));
    }
    next();
  }, unitController.createUnit);

router
  .route('/:id')
  .get(unitController.getUnit)
  .patch(unitUpload.any(), (req, res, next) => {
    console.log('PATCH - After multer - files:', req.files ? req.files.length : 0);
    if (req.files) {
      console.log('File details:', req.files.map(f => ({ fieldname: f.fieldname, originalname: f.originalname, size: f.size })));
    }
    next();
  }, unitController.updateUnit)
  .delete(unitController.deleteUnit);

module.exports = router;
