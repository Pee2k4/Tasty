// fastfood-backend/controllers/dashboardController.js
const db = require('../config/db');

// Hàm helper để lấy ngày bắt đầu của 30 ngày trước
const get30DaysAgoDate = () => {
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return date.toISOString().split('T')[0]; // Format: YYYY-MM-DD
};

// Hàm chính
const getDashboardStats = async (req, res) => {
    try {
        const thirtyDaysAgo = get30DaysAgoDate(); // Lấy mốc 30 ngày

        // 1. KPI Box 1: Doanh thu tháng
        // (Chỉ tính đơn hàng đã 'completed' hoặc 'delivered')
        const [revenueRows] = await db.query(
            "SELECT SUM(total_price) as totalRevenue FROM orders WHERE (status = 'completed' OR status = 'delivered') AND created_at >= ?",
            [thirtyDaysAgo]
        );
        const totalRevenueMonth = revenueRows[0].totalRevenue || 0;

        // 2. KPI Box 2: Đơn hàng tháng
        const [ordersRows] = await db.query(
            "SELECT COUNT(id) as totalOrders FROM orders WHERE created_at >= ?",
            [thirtyDaysAgo]
        );
        const totalOrdersMonth = ordersRows[0].totalOrders || 0;

        // 3. KPI Box 3: Khách hàng mới
        const [usersRows] = await db.query(
            "SELECT COUNT(id) as newUsers FROM users WHERE created_at >= ?",
            [thirtyDaysAgo]
        );
        const newUsersMonth = usersRows[0].newUsers || 0;

        // 4. KPI Box 4: Đơn hàng chờ xử lý (Actionable)
        const [pendingRows] = await db.query(
            "SELECT COUNT(id) as pendingOrders FROM orders WHERE status = 'processing' OR status = 'pending'"
        );
        const pendingOrders = pendingRows[0].pendingOrders || 0;

        // 5. Chart 1: Doanh thu 7 ngày qua (GROUP BY day)
        const [salesChartRows] = await db.query(`
            SELECT 
                DATE(created_at) as date, 
                SUM(total_price) as dailyRevenue
            FROM orders 
            WHERE created_at >= ?
            AND (status = 'completed' OR status = 'delivered')
            GROUP BY DATE(created_at)
            ORDER BY date ASC
            LIMIT 7;
        `, [new Date(new Date().setDate(new Date().getDate() - 7)).toISOString().split('T')[0]]); // 7 ngày trước

        // 6. Chart 2: Top 5 sản phẩm/combo bán chạy
        const [topProductsRows] = await db.query(`
            SELECT 
                p.name as productName, 
                SUM(oi.quantity) as totalSold
            FROM order_items oi
            JOIN products p ON oi.product_id = p.id
            GROUP BY p.name
            ORDER BY totalSold DESC
            LIMIT 5;
        `);
        // (Bạn có thể cần JOIN thêm bảng combo nếu muốn)

        // 7. List: 5 Đơn hàng mới nhất cần xử lý
        const [recentOrdersRows] = await db.query(
            "SELECT id, shipping_full_name, total_price, status, created_at FROM orders WHERE status = 'processing' OR status = 'pending' ORDER BY created_at DESC LIMIT 5"
        );
        
        // Trả về tất cả dữ liệu
        res.status(200).json({
            message: 'Lấy dữ liệu dashboard thành công',
            data: {
                kpi: {
                    totalRevenueMonth,
                    totalOrdersMonth,
                    newUsersMonth,
                    pendingOrders
                },
                charts: {
                    salesLast7Days: salesChartRows,
                    topProducts: topProductsRows
                },
                lists: {
                    recentOrders: recentOrdersRows
                }
            }
        });

    } catch (error) {
        console.error('Lỗi khi lấy dữ liệu dashboard:', error);
        res.status(500).json({ message: 'Lỗi server' });
    }
};

module.exports = {
    getDashboardStats
};