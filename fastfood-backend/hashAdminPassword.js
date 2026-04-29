// hashAdminPassword.js
const bcrypt = require('bcryptjs');

const plainPassword = '12345678'; // Mật khẩu bạn muốn hash
const saltRounds = 10; // Độ phức tạp của việc hash (10-12 là phổ biến)

// Mã hóa mật khẩu (dùng hàm đồng bộ cho script đơn giản này)
try {
    const hashedPassword = bcrypt.hashSync(plainPassword, saltRounds);

    console.log('Mật khẩu gốc:', plainPassword);
    console.log('Salt Rounds:', saltRounds);
    console.log('Mật khẩu đã mã hóa (hash):');
    console.log(hashedPassword); // Đây là chuỗi bạn cần lưu vào DB

    console.log('\n---> Sao chép chuỗi mật khẩu đã mã hóa ở trên và dán vào câu lệnh SQL INSERT INTO.');

} catch (error) {
    console.error('Lỗi khi mã hóa mật khẩu:', error);
}