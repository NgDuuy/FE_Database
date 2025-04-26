import React, { useState, useEffect } from 'react';
import OrderHistory from '../components/OrderHistory';

const ProfilePage = ({ user }) => {
    const [editMode, setEditMode] = useState(false);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        address: '',
        phone: '',
        dob: ''
    });

    useEffect(() => {
        if (user) {
            // Initialize user data
            setUserData({
                name: user.UserName || '',
                email: user.UserEmail || '',
                address: user.UserAddress || '',
                phone: user.UserPhoneNo || '',
                dob: user.UserDOB || ''
            });
        }
    }, [user]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSave = () => {
        // Here you would typically send the updated data to your backend
        console.log('Updated user data:', userData);
        setEditMode(false);
    };

    if (!user) {
        return (
            <div className="profile-page">
                <h1>Profile</h1>
                <p>Please login to view your profile</p>
            </div>
        );
    }

    // Determine user rank based on spending (mock data)
    const totalSpent = 1250; // This would come from the backend
    let userRank = 'Regular';
    if (totalSpent > 1000) userRank = 'Diamond';
    else if (totalSpent > 500) userRank = 'Gold';
    else if (totalSpent > 200) userRank = 'Silver';

    return (
        <div className="profile-page">
            <h1>Your Profile</h1>

            <div className="profile-info">
                <div className="info-card">
                    <h2>Account Information</h2>

                    {editMode ? (
                        <>
                            <div className="form-group">
                                <label>Full Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={userData.name}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={userData.email}
                                    onChange={handleInputChange}
                                />
                            </div>

                            <div className="form-group">
                                <label>Date of Birth:</label>
                                <input
                                    type="date"
                                    name="dob"
                                    value={userData.dob}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p><strong>Name:</strong> {userData.name}</p>
                            <p><strong>Email:</strong> {userData.email}</p>
                            <p><strong>Member Since:</strong> {new Date(user.UserRegistrationDate).toLocaleDateString()}</p>
                            <p><strong>Account Rank:</strong> <span className={`rank ${userRank.toLowerCase()}`}>{userRank}</span></p>
                            <p><strong>Total Spent:</strong> ${totalSpent.toFixed(2)}</p>
                        </>
                    )}
                </div>

                <div className="info-card">
                    <h2>Shipping Information</h2>

                    {editMode ? (
                        <>
                            <div className="form-group">
                                <label>Address:</label>
                                <textarea
                                    name="address"
                                    value={userData.address}
                                    onChange={handleInputChange}
                                    rows="3"
                                />
                            </div>

                            <div className="form-group">
                                <label>Phone Number:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={userData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </>
                    ) : (
                        <>
                            <p><strong>Address:</strong> {userData.address || 'Not provided'}</p>
                            <p><strong>Phone:</strong> {userData.phone || 'Not provided'}</p>
                        </>
                    )}

                    <div className="profile-actions">
                        {editMode ? (
                            <>
                                <button onClick={handleSave} className="save-btn">Save Changes</button>
                                <button onClick={() => setEditMode(false)} className="cancel-btn">Cancel</button>
                            </>
                        ) : (
                            <button onClick={() => setEditMode(true)} className="edit-btn">Edit Information</button>
                        )}
                    </div>
                </div>
            </div>

            <div className="order-history">
                <h2>Recent Orders</h2>
                <OrderHistory userId={user.UserID} />
            </div>

            <div className="account-actions">
                <button className="change-password-btn">Change Password</button>
                <button className="delete-account-btn">Delete Account</button>
            </div>
        </div>
    );
};

export default ProfilePage; 