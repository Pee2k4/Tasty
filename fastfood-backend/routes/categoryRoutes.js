// fastfood-backend/routes/categoryRoutes.js
const express = require('express');
const { getAllCategories } = require('../controllers/categoryController');
// const { protect, admin } = require('../middleware/authMiddleware'); // Cần cho việc thêm/sửa/xóa sau này

const router = express.Router();

// Route GET /api/categories (công khai, ai cũng xem được)
router.route('/').get(getAllCategories);

// (Trong tương lai có thể thêm các route POST, PUT, DELETE được bảo vệ bởi admin ở đây)
// router.route('/').post(protect, admin, createCategory);
// router.route('/:id').put(protect, admin, updateCategory);
// router.route('/:id').delete(protect, admin, deleteCategory);

module.exports = router;