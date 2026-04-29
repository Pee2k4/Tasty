// fastfood-backend/routes/authRoutes.js
const express = require('express');
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middlewares/authMiddleware'); // <-- Import middleware

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

// THÊM ROUTE MỚI: Dùng 'protect' để bảo vệ
router.route('/me').get(protect, getUserProfile);

module.exports = router;