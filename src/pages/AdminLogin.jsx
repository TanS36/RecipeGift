import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css'; // Import the CSS file

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const backendUrl = 'http://localhost:8080/api/auth/login';
            const response = await fetch(backendUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('isAdminLoggedIn', 'true');
                navigate('/admin');
            } else {
                const errorData = await response.json();
                setError(errorData.error || 'Login failed');
            }
        } catch (error) {
            setError('Network error');
        }
    };

    return (
        <div className="admin-login-container">
            <h1 className="admin-login-heading">Admin Login</h1>
            {error && <p className="admin-login-error">{error}</p>}
            <form onSubmit={handleSubmit} className="admin-login-form">
                <div className="admin-login-input-group">
                    <label htmlFor="username" className="admin-login-label">Username:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        className="admin-login-input"
                    />
                </div>
                <div className="admin-login-input-group">
                    <label htmlFor="password" className="admin-login-label">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="admin-login-input"
                    />
                </div>
                <button type="submit" className="admin-login-button">Login</button>
            </form>
        </div>
    );
};

export default AdminLogin;