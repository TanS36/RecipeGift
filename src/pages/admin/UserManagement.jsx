import React, { useState, useEffect } from 'react';
import './UserManagement.css';

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [newUser, setNewUser] = useState({ name: '', age: '', profilePictureUrl: '', favoriteFoods: '' });
    const [editingUser, setEditingUser] = useState(null);
    const [editedUser, setEditedUser] = useState({ id: '', name: '', age: '', profilePictureUrl: '', favoriteFoods: '' });

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        setLoading(true);
        setError('');
        try {
            const adminToken = localStorage.getItem('adminToken'); // Assuming you store the token in local storage

            const response = await fetch('/api/admin/users', {
                headers: {
                    'Authorization': `Bearer ${adminToken}`, // Include the token
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            setUsers(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateClick = () => {
        setIsCreating(true);
        setNewUser({ name: '', age: '', profilePictureUrl: '', favoriteFoods: '' });
    };

    const handleCreateInputChange = (e) => {
        const { name, value } = e.target;
        setNewUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleCreateSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('/api/admin/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(newUser),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchUsers();
            setIsCreating(false);
        } catch (err) {
            setError(`Failed to create user: ${err.message}`);
        }
    };

    const handleEditClick = (user) => {
        setEditingUser(user);
        setEditedUser({ ...user, favoriteFoods: user.favoriteFoods ? user.favoriteFoods.join(',') : '' });
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser(prevState => ({ ...prevState, [name]: value }));
    };

    const handleEditSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/admin/users/${editedUser.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: editedUser.name,
                    age: editedUser.age,
                    profilePictureUrl: editedUser.profilePictureUrl,
                    favoriteFoods: editedUser.favoriteFoods.split(',').map(food => food.trim()).filter(food => food !== ''),
                }),
            });
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            fetchUsers();
            setEditingUser(null);
        } catch (err) {
            setError(`Failed to update user: ${err.message}`);
        }
    };

    const handleDeleteClick = async (id) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            try {
                const response = await fetch(`/api/admin/users/${id}`, { method: 'DELETE' });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                fetchUsers();
            } catch (err) {
                setError(`Failed to delete user: ${err.message}`);
            }
        }
    };

    if (loading) return <div>Loading users...</div>;
    if (error) return <div>Error loading users: {error}</div>;

    return (
        <div className="user-management-container">
            <h2>Manage Users</h2>

            <button onClick={handleCreateClick} className="admin-button">Create New User</button>

            {isCreating && (
                <div className="create-user-form">
                    <h3>Create New User</h3>
                    <form onSubmit={handleCreateSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={newUser.name} onChange={handleCreateInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input type="number" id="age" name="age" value={newUser.age} onChange={handleCreateInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profilePictureUrl">Profile Picture URL:</label>
                            <input type="text" id="profilePictureUrl" name="profilePictureUrl" value={newUser.profilePictureUrl} onChange={handleCreateInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="favoriteFoods">Favorite Foods (comma-separated):</label>
                            <input type="text" id="favoriteFoods" name="favoriteFoods" value={newUser.favoriteFoods} onChange={handleCreateInputChange} />
                        </div>
                        <button type="submit" className="admin-button">Create</button>
                        <button type="button" onClick={() => setIsCreating(false)} className="admin-button">Cancel</button>
                    </form>
                </div>
            )}

            {users.length > 0 ? (
                <table className="user-table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Profile Picture</th>
                        <th>Favorite Foods</th>
                        <th>Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.age}</td>
                            <td>{user.profilePictureUrl && <img src={user.profilePictureUrl} alt={user.name} style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}</td>
                            <td>{user.favoriteFoods ? user.favoriteFoods.join(', ') : ''}</td>
                            <td>
                                <button onClick={() => handleEditClick(user)} className="admin-button">Edit</button>
                                <button onClick={() => handleDeleteClick(user.id)} className="admin-button delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No users found.</p>
            )}

            {editingUser && (
                <div className="edit-user-form">
                    <h3>Edit User</h3>
                    <form onSubmit={handleEditSubmit}>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" name="name" value={editedUser.name} onChange={handleEditInputChange} required />
                        </div>
                        <div className="form-group">
                            <label htmlFor="age">Age:</label>
                            <input type="number" id="age" name="age" value={editedUser.age} onChange={handleEditInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="profilePictureUrl">Profile Picture URL:</label>
                            <input type="text" id="profilePictureUrl" name="profilePictureUrl" value={editedUser.profilePictureUrl} onChange={handleEditInputChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="favoriteFoods">Favorite Foods (comma-separated):</label>
                            <input type="text" id="favoriteFoods" name="favoriteFoods" value={editedUser.favoriteFoods} onChange={handleEditInputChange} />
                        </div>
                        <button type="submit" className="admin-button">Save</button>
                        <button type="button" onClick={() => setEditingUser(null)} className="admin-button">Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default UserManagement;