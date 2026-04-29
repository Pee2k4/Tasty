// src/pages/homeSections/HeroSection.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
// 1. Bỏ các import không dùng (TextField, Autocomplete, CircularProgress)
import { Box, Typography, Container, Button } from '@mui/material';
// Bỏ import apiClient vì không còn tìm kiếm

function HeroSection() {
    const navigate = useNavigate();

    // --- ĐÃ XÓA TOÀN BỘ STATE VÀ USEEFFECT LIÊN QUAN ĐẾN TÌM KIẾM ---

    return (
        <Box
            sx={{
                height: { xs: 450, md: 550 },
                // Giữ nguyên ảnh nền cũ của bạn
                background: 'linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url("/salad_hero.png")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center', // Vẫn căn giữa theo chiều dọc
                // 2. THAY ĐỔI CĂN CHỈNH NGANG
                justifyContent: 'flex-start', // Căn trái nội dung
                color: 'white',
                textAlign: 'left', // Căn trái văn bản
                // Tăng padding trái để nội dung không sát lề
                px: { xs: 4, md: 12 },
                animation: 'fadeIn 1.5s ease-in-out',
                '@keyframes fadeIn': {
                    from: { opacity: 0 },
                    to: { opacity: 1 },
                },
            }}
        >
            {/* Container giúp giới hạn độ rộng nội dung trên màn hình lớn */}
            <Container maxWidth="md" sx={{ ml: 0, pl: 0 }}> { /* ml: 0, pl: 0 để đảm bảo sát lề trái của flex container */}
                <Typography
                    variant="h2"
                    component="h1"
                    sx={{
                        fontWeight: 'bold',
                        lineHeight: 1.2,
                        textShadow: '2px 2px 8px rgba(0,0,0,0.7)',
                        mb: 2, // Thêm khoảng cách dưới tiêu đề
                        fontSize: { xs: '2.5rem', md: '3.5rem' } // Điều chỉnh cỡ chữ
                    }}
                >
                    Meat, Eat & Enjoy <br /> the true taste
                </Typography>
                <Typography
                    sx={{
                        mb: 4, // Khoảng cách với nút bấm
                        color: 'white',
                        opacity: 0.9,
                        maxWidth: '500px',
                        // Bỏ mx: 'auto' cũ
                        fontSize: { xs: '1rem', md: '1.1rem' }
                    }}
                >
                    Khám phá hương vị đích thực từ những nguyên liệu tươi ngon nhất, được chế biến bởi các đầu bếp hàng đầu.
                </Typography>

                {/* 3. THÊM NÚT "MUA NGAY" MÀU CAM */}
                <Button
                    variant="contained"
                    size="large"
                    onClick={() => navigate('/menu')} // Chuyển hướng đến trang Menu
                    sx={{
                        bgcolor: '#ff9800', // Màu cam (bạn có thể chỉnh mã màu này cho giống hệt ảnh nếu cần)
                        color: 'white',
                        fontWeight: 'bold',
                        px: 5,     // Padding ngang rộng
                        py: 1.5,   // Padding dọc
                        borderRadius: '50px', // Bo tròn nhiều như hình viên thuốc
                        fontSize: '1.1rem',
                        textTransform: 'none', // Không viết hoa toàn bộ chữ
                        boxShadow: '0 4px 12px rgba(255, 152, 0, 0.4)', // Hiệu ứng bóng màu cam
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            bgcolor: '#e68a00', // Màu cam đậm hơn khi di chuột vào
                            boxShadow: '0 6px 16px rgba(255, 152, 0, 0.6)',
                            transform: 'translateY(-2px)' // Hiệu ứng nổi nhẹ lên
                        }
                    }}
                >
                    Mua Ngay
                </Button>
            </Container>
        </Box>
    );
}

export default HeroSection;