import React, { useState } from 'react';

const Login = ({ onClose, onLogin, onRegisterClick }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setError('Please fill in all fields');
            return;
        }

        // Here you would typically call your authentication API
        // For demo purposes, we'll just simulate a successful login
        const mockUser = {
            UserID: 1,
            UserName: 'Demo User',
            UserEmail: email,
            UserRegistrationDate: '2023-01-01',
            UserAddress: '123 Main St',
            UserPhoneNo: '555-1234',
            UserTypeAccount: 'gold'
        };

        onLogin(mockUser);
    };

    return (
        <div className="auth-modal">
            <div className="auth-content">
                <button onClick={onClose} className="close-btn">&times;</button>
                <h2>Login</h2>

                {error && <p className="error-message">{error}</p>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email:</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label>Password:</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button type="submit" className="auth-btn">Login</button>
                </form>

                <p className="auth-footer">
                    Don't have an account?{' '}
                    <button onClick={onRegisterClick} className="auth-link">
                        Register here
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;