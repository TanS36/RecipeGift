import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './AdminPanel.css';

const AdminPanel = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
        if (!isAdminLoggedIn) {
            navigate('/admin/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('isAdminLoggedIn');
        localStorage.removeItem('jwtToken'); // Remove JWT on logout
        navigate('/admin/login');
    };

    return (
        <div className="admin-panel-container">
            <h1 className="admin-panel-heading">Admin Panel</h1>
            <p className="admin-panel-welcome">Welcome, Admin!</p>
            <nav className="admin-panel-navigation">
                <Link to="/admin/users" className="admin-panel-link">Manage Users</Link>
                <Link to="/admin/recipes" className="admin-panel-link">Manage Recipes</Link>
                <Link to="/admin/categories" className="admin-panel-link">Manage Categories</Link>
            </nav>
            <button onClick={handleLogout} className="admin-panel-logout-button">Logout</button>
        </div>
    );
};

export default AdminPanel;
