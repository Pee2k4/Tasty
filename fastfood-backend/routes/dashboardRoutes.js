// fastfood-backend/routes/dashboardRoutes.js
const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');
// const { protect, admin } = require('../middleware/authMiddleware');

// (Tạm thời chưa cần protect, sau này bạn sẽ thêm)
router.get('/stats', getDashboardStats); 

module.exports = router;