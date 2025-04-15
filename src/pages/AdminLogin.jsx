import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit called");

        try {
            console.log("Fetching login data...");
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: username,
                    password: password,
                }),
            });

            console.log("Response:", response);

            if (response.ok) {
                const data = await response.json();
                console.log("Data:", data);
                console.log("Token stored:", data.token);
                localStorage.setItem('jwtToken', data.token);
                console.log("Navigating to /admin"); // Changed navigation path
                navigate('/admin'); // Changed navigation path
                console.log("Navigated to /admin");
            } else {
                console.log("Invalid credentials");
                setError('Invalid credentials');
            }
        } catch (error) {
            console.log("Error:", error);
            setError('Login failed');
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