// src/pages/RegisterPage.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Container, Typography, TextField, Button, Box, Alert, Link } from '@mui/material';

function RegisterPage() {
    const [formData, setFormData] = useState({ fullName: '', email: '', password: '', phoneNumber: '' });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await register(formData);
            navigate('/'); // Chuyển về trang chủ sau khi đăng ký thành công
        } catch (err) {
            setError(err.response?.data?.message || 'Đăng ký không thành công.');
        }
    };

    return (
        <Container maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Đăng Ký</Typography>
                {error && <Alert severity="error" sx={{ mt: 2, width: '100%' }}>{error}</Alert>}
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                    <TextField margin="normal" required fullWidth label="Họ và Tên" name="fullName" onChange={handleChange} autoFocus />
                    <TextField margin="normal" required fullWidth label="Email" name="email" type="email" onChange={handleChange} />
                    <TextField margin="normal" required fullWidth label="Mật khẩu" name="password" type="password" onChange={handleChange} />
                    <TextField margin="normal" required fullWidth label="Số điện thoại" name="phoneNumber" onChange={handleChange} />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Đăng Ký</Button>
                    <Link component={RouterLink} to="/login" variant="body2">
                        {"Đã có tài khoản? Đăng nhập"}
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
export default RegisterPage;