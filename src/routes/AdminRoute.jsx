import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    return isAdminLoggedIn ? <Outlet /> : <Navigate to="/admin/login" />;
};

export default AdminRoute;