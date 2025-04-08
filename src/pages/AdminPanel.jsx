import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPanel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (!isAdminLoggedIn) {
            navigate('/admin/login'); // Redirect if not logged in
        }
        // You would fetch admin data here using the admin-specific authentication
        // (e.g., checking for the cookie or including the admin JWT in headers).
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        navigate('/admin/login');
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            <p>Welcome, Admin!</p>
            <button onClick={handleLogout}>Logout</button>
            {/* Components for managing users, recipes, categories would go here */}
        </div>
    );
};

export default AdminPanel;