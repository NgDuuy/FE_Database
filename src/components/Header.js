import React from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';

const Header = ({ user, cartItemCount, onLoginClick, onLogoutClick }) => {
    return (
        <header className="header">
            <div className="container">
                <div className="logo">
                    <Link to="/">BookStore</Link>
                </div>

                <Search />

                <nav className="main-nav">
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/cart">Cart ({cartItemCount})</Link></li>
                        <li><Link to="/orders">Orders</Link></li>
                        {user && <li><Link to="/profile">Profile</Link></li>}
                    </ul>
                </nav>

                <div className="auth-buttons">
                    {user ? (
                        <button onClick={onLogoutClick} className="logout-btn">Logout</button>
                    ) : (
                        <button onClick={onLoginClick} className="login-btn">Login</button>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Header;