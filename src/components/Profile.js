import React from 'react';
import OrderHistory from '../components/OrderHistory';

const ProfilePage = ({ user }) => {
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
                    <p><strong>Name:</strong> {user.UserName}</p>
                    <p><strong>Email:</strong> {user.UserEmail}</p>
                    <p><strong>Member Since:</strong> {new Date(user.UserRegistrationDate).toLocaleDateString()}</p>
                    <p><strong>Account Rank:</strong> <span className={`rank ${userRank.toLowerCase()}`}>{userRank}</span></p>
                    <p><strong>Total Spent:</strong> ${totalSpent.toFixed(2)}</p>
                </div>

                <div className="info-card">
                    <h2>Shipping Information</h2>
                    <p><strong>Address:</strong> {user.UserAddress}</p>
                    <p><strong>Phone:</strong> {user.UserPhoneNo}</p>
                    <button className="edit-btn">Edit Information</button>
                </div>
            </div>

            <div className="order-history">
                <h2>Order History</h2>
                <OrderHistory userId={user.UserID} />
            </div>
        </div>
    );
};

export default ProfilePage;