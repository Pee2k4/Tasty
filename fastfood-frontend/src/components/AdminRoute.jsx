// src/components/AdminRoute.jsx
import React from 'react';
import { Navigate, Outlet, Link as RouterLink, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import InventoryIcon from '@mui/icons-material/Inventory';
import ListAltIcon from '@mui/icons-material/ListAlt';
import PeopleIcon from '@mui/icons-material/People';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const drawerWidth = 240;

const AdminLayout = () => {
  const location = useLocation();

  const menuItems = [
    { text: 'Tổng quan', icon: <DashboardIcon />, path: '/admin' },
    { text: 'Quản lý Sản phẩm', icon: <InventoryIcon />, path: '/admin/products' },
    { text: 'Quản lý Combo', icon: <FastfoodIcon />, path: '/admin/combos' },
    { text: 'Quản lý Đơn hàng', icon: <ListAltIcon />, path: '/admin/orders' },
    { text: 'Quản lý Người dùng', icon: <PeopleIcon />, path: '/admin/users' },
  ];

  const drawer = (
    <div>
      <Toolbar sx={{ justifyContent: 'center', my: 1 }}>
        <Typography variant="h6" noWrap component="div">
          ADMIN TASTY
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              component={RouterLink}
              to={item.path}
              selected={
                item.path === '/admin'
                  ? location.pathname === '/admin'
                  : location.pathname.startsWith(item.path)
              }
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      {/* Sidebar (Permanent Drawer) */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {drawer}
      </Drawer>

      {/* Main Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: '#f4f6f8',
          p: 3,
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};

// Kiểm tra quyền Admin
const AdminRoute = () => {
  const { isLoggedIn, isAdmin } = useAuth();
  const token = localStorage.getItem('token');
  const isAdminStored = localStorage.getItem('isAdmin') === 'true';

  console.log('Kiểm tra AdminRoute:', { isLoggedIn, isAdmin, isAdminStored, token });

  if (isLoggedIn && isAdmin && isAdminStored && token) {
    console.log('AdminRoute: Access Granted, rendering AdminLayout');
    return <AdminLayout />;
  } else {
    console.log('AdminRoute: Access Denied, redirecting to /login');
    return <Navigate to="/login" replace />;
  }
};

export default AdminRoute;
