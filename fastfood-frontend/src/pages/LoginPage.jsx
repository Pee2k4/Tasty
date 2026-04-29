// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Alert, Link, Grid, CircularProgress } from '@mui/material'; // Thêm CircularProgress

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false); // Thêm state loading
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Bắt đầu loading
        try {
            // Gọi hàm login và nhận kết quả trả về
            const response = await login(email, password);

            // Kiểm tra trạng thái admin từ dữ liệu trả về
            // Đối với admin, chúng ta đã thêm { isAdmin: true } vào user object trả về
            // Đối với user thường, backend nên trả về thông tin user (hoặc chúng ta tự gán isAdmin: false)
            const loggedInUser = response?.data?.data; // Lấy user data từ response
            const loggedInUserIsAdmin = loggedInUser?.isAdmin === true || (loggedInUser?.role === 'admin'); // Kiểm tra isAdmin hoặc role

            console.log("Login response data:", loggedInUser);
            console.log("Is Admin Check:", loggedInUserIsAdmin);

            if (loggedInUserIsAdmin) {
                console.log("Chuyển hướng đến /admin");
                navigate('/admin'); // Chuyển hướng admin
            } else {
                console.log("Chuyển hướng đến /");
                navigate('/'); // Chuyển hướng user thường
            }

        } catch (err) {
            setError(err.response?.data?.message || 'Đăng nhập không thành công.');
            console.error("Lỗi đăng nhập:", err);
            setLoading(false); // Dừng loading nếu có lỗi
        }
        // Không cần setLoading(false) ở đây vì đã navigate đi chỗ khác nếu thành công
    };

    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    Đăng Nhập
                </Typography>
                {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal" required fullWidth id="email" label="Địa chỉ Email"
                        name="email" autoComplete="email" autoFocus
                        value={email} onChange={(e) => setEmail(e.target.value)}
                        placeholder={email === '' ? 'Tài khoản ' : ''}
                        disabled={loading} // Disable khi đang loading
                    />
                    <TextField
                        margin="normal" required fullWidth name="password" label="Mật khẩu"
                        type="password" id="password" autoComplete="current-password"
                        value={password} onChange={(e) => setPassword(e.target.value)}
                        placeholder={password === '' ? 'Mật khẩu ' : ''}
                        disabled={loading} // Disable khi đang loading
                    />
                    <Button
                        type="submit" fullWidth variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={loading} // Disable nút khi đang loading
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : 'Đăng Nhập'}
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link component={RouterLink} to="/register" variant="body2">
                                {"Chưa có tài khoản? Đăng ký"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}

export default LoginPage;