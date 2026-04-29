// src/pages/homeSections/CategoriesSection.jsx
import React from 'react';
import { Box, Typography, Container, Grid, Card, CardMedia, Stack, useTheme } from '@mui/material';
import { Link } from 'react-router-dom';

// Dữ liệu 6 danh mục, sắp xếp theo thứ tự bạn muốn chúng xuất hiện
// Thêm mô tả ngắn để làm cho nó hấp dẫn hơn (tùy chỉnh theo nhu cầu)
const categories = [
    { name: 'BURGER', image: '/category_burger.jpg', slug: 'burger', description: 'Juicy burgers for every craving' }, // Thẻ Lớn 1
    { name: 'PIZZA', image: '/category_pizza.jpg', slug: 'pizza', description: 'Cheesy pizzas with fresh toppings' }, // Thẻ Nhỏ 1
    { name: 'GÀ RÁN', image: '/category_chicken.jpg', slug: 'ga-ran', description: 'Crispy fried chicken delights' }, // Thẻ Nhỏ 2
    { name: 'SALADS', image: '/category_salad.jpg', slug: 'salads', description: 'Fresh and healthy salads' }, // Thẻ Nhỏ 3
    { name: 'KHOAI TÂY & BÁNH', image: '/category_sides_dessert.jpg', slug: 'khoai-tay-va-banh', description: 'Sides and sweet treats' }, // Thẻ Nhỏ 4
    { name: 'DRINKS', image: '/category_drinks.jpg', slug: 'drinks', description: 'Refreshing drinks and beverages' }, // Thẻ Lớn 2
];

// Component Card tùy chỉnh, có thể nhận chiều cao động
const DynamicCategoryCard = ({ category, height }) => {
    const theme = useTheme(); // Sử dụng theme để màu sắc nhất quán

    return (
        <Link 
            to={`/menu/${category.slug}`} 
            style={{ textDecoration: 'none' }}
            aria-label={`View ${category.name} menu`}
        >
            <Card sx={{
                height: height, // Nhận chiều cao tùy chỉnh
                position: 'relative',
                borderRadius: '20px', // Bo góc lớn hơn để hiện đại
                cursor: 'pointer',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)', // Bóng đổ mềm mại
                transition: 'all 0.4s ease-in-out', // Transition mượt mà
                '&:hover': {
                    transform: 'translateY(-8px) scale(1.02)', // Di chuyển nhẹ và phóng to
                    boxShadow: '0 16px 48px rgba(0, 0, 0, 0.3)', // Bóng đổ sâu hơn khi hover
                },
            }}>
                <CardMedia
                    component="img"
                    image={category.image}
                    alt={`Image of ${category.name} category`}
                    loading="lazy" // Lazy loading cho hiệu suất
                    sx={{
                        height: '100%',
                        width: '100%',
                        objectFit: 'cover',
                        filter: 'brightness(0.7)', // Tăng độ tối để chữ nổi bật
                        transition: 'transform 0.4s ease-in-out, filter 0.4s ease-in-out',
                        '&:hover': {
                            transform: 'scale(1.08)', // Phóng to ảnh
                            filter: 'brightness(0.5)', // Tối hơn khi hover
                        },
                    }}
                />
                {/* Overlay gradient để chữ nổi bật */}
                <Box sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.6) 100%)`, // Gradient mờ
                    opacity: 0.8,
                    transition: 'opacity 0.4s ease-in-out',
                    '&:hover': {
                        opacity: 1, // Tăng opacity khi hover
                    },
                }} />
                {/* Nội dung chữ */}
                <Box sx={{
                    position: 'absolute',
                    bottom: 30,
                    width: '100%',
                    textAlign: 'center',
                    color: 'white',
                    px: 3,
                    transition: 'all 0.4s ease-in-out',
                    '&:hover': {
                        transform: 'translateY(-5px)', // Di chuyển chữ lên nhẹ
                    },
                }}>
                    <Typography 
                        variant="h4" 
                        sx={{ 
                            fontWeight: 'bold', 
                            textShadow: '2px 2px 4px rgba(0,0,0,0.7)', // Bóng đổ cho chữ
                            mb: 1,
                        }}
                    >
                        {category.name}
                    </Typography>
                    <Typography 
                        variant="body1" 
                        sx={{ 
                            fontWeight: 300, 
                            textShadow: '1px 1px 2px rgba(0,0,0,0.5)', 
                            opacity: 0.9,
                        }}
                    >
                        {category.description}
                    </Typography>
                </Box>
            </Card>
        </Link>
    );
};

function CategoriesSection() {
    const theme = useTheme();
    // Chiều cao động dựa trên breakpoint
    const largeHeight = theme.breakpoints.down('md') ? 350 : 500; // Giảm trên mobile
    const smallHeight = theme.breakpoints.down('md') ? 180 : 240; // Giảm trên mobile
    const spacing = theme.breakpoints.down('md') ? 2 : 2.5; // Giảm spacing trên mobile

    return (
        <Container sx={{ my: { xs: 5, md: 10 } }}> {/* Responsive margin */}
            <Typography 
                variant="h3" 
                component="h2" 
                sx={{ 
                    textAlign: 'center', 
                    mb: 6, 
                    fontWeight: 'bold', 
                    color: theme.palette.primary.main, // Sử dụng màu primary từ theme
                    textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                }}
            >
                Menu Categories
            </Typography>
            
            {/* Grid container chính (cho 2 hàng) */}
            <Grid container spacing={spacing}>
            
                {/* === HÀNG 1 === */}
                <Grid item xs={12}>
                    <Grid container spacing={spacing}>
                        {/* Cột 1: Thẻ Lớn (Burger) */}
                        <Grid item xs={12} md={7}>
                            <DynamicCategoryCard category={categories[0]} height={largeHeight} />
                        </Grid>
                        {/* Cột 2: 2 Thẻ Nhỏ (Pizza, Gà Rán) */}
                        <Grid item xs={12} md={5}>
                            <Stack spacing={spacing}>
                                <DynamicCategoryCard category={categories[1]} height={smallHeight} />
                                <DynamicCategoryCard category={categories[2]} height={smallHeight} />
                            </Stack>
                        </Grid>
                    </Grid>
                </Grid>

                {/* === HÀNG 2 (Bố cục đảo ngược) === */}
                <Grid item xs={12}>
                    <Grid container spacing={spacing}>
                        {/* Cột 1: 2 Thẻ Nhỏ (Salads, Khoai Tây) */}
                        <Grid item xs={12} md={5}>
                            <Stack spacing={spacing}>
                                <DynamicCategoryCard category={categories[3]} height={smallHeight} />
                                <DynamicCategoryCard category={categories[4]} height={smallHeight} />
                            </Stack>
                        </Grid>
                        {/* Cột 2: Thẻ Lớn (Drinks) */}
                        <Grid item xs={12} md={7}>
                            <DynamicCategoryCard category={categories[5]} height={largeHeight} />
                        </Grid>
                    </Grid>
                </Grid>

            </Grid>
        </Container>
    );
}

export default CategoriesSection;
