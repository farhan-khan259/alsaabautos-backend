const express = require('express');
const authController = require('../Controller/AuthController');
const { protect } = require('../Middlewares/AuthMiddleware');

const router = express.Router();

router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/me', protect, authController.getMe);
router.patch('/updatedetails', protect, authController.updateDetails);

module.exports = router;
