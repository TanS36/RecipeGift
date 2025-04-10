import React, { useState, useEffect } from 'react';
import './UserManagement.css'; // Import CSS for styling

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const backendUrl = 'http://localhost:8080/api/admin/users';
                const response = await fetch(backendUrl, { // Replace with your actual API endpoint
                    headers: {
                        // Include any necessary authentication headers (e.g., admin token)
                        // 'Authorization': `Bearer ${localStorage.getItem('adminToken')}`,
                    },
                });

                if (!response.ok) {
                    const message = `An error occurred: ${response.status}`;
                    throw new Error(message);
                }

                const data = await response.json();
                setUsers(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    if (loading) {
        return <div>Loading users...</div>;
    }

    if (error) {
        return <div>Error loading users: {error}</div>;
    }

    return (
        <div className="user-management-container">
            <h2>Manage Users</h2>
            {users.length > 0 ? (
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        {/* Add more columns as needed */}
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <button className="user-action-button">Edit</button>
                                <button className="user-action-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}
        </div>
    );
};

export default UserManagement;