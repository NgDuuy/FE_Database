import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const OrderPage = ({ user }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all');

    useEffect(() => {
        // Simulate API call to fetch orders
        const fetchOrders = async () => {
            // Mock data - replace with actual API call
            const mockOrders = [
                {
                    OrderID: 1,
                    OrderDate: '2023-05-15',
                    TotalAmount: 89.97,
                    Status: 'Delivered',
                    Items: [
                        { BookID: 1, ProductName: 'React Fundamentals', Quantity: 2, Price: 29.99 },
                        { BookID: 2, ProductName: 'Database Design', Quantity: 1, Price: 39.99 }
                    ]
                },
                {
                    OrderID: 2,
                    OrderDate: '2023-06-20',
                    TotalAmount: 59.98,
                    Status: 'Processing',
                    Items: [
                        { BookID: 3, ProductName: 'JavaScript Advanced', Quantity: 1, Price: 49.99 },
                        { BookID: 4, ProductName: 'CSS Mastery', Quantity: 1, Price: 9.99 }
                    ]
                },
            ];

            setTimeout(() => {
                setOrders(mockOrders);
                setLoading(false);
            }, 500);
        };

        if (user) {
            fetchOrders();
        }
    }, [user]);

    const filteredOrders = filter === 'all'
        ? orders
        : orders.filter(order => order.Status.toLowerCase() === filter.toLowerCase());

    if (!user) {
        return (
            <div className="order-page">
                <h1>My Orders</h1>
                <p>Please login to view your orders</p>
                <Link to="/login" className="login-link">Login</Link>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="order-page">
                <h1>My Orders</h1>
                <p>Loading your orders...</p>
            </div>
        );
    }

    return (
        <div className="order-page">
            <h1>My Orders</h1>

            <div className="order-filters">
                <button
                    className={filter === 'all' ? 'active' : ''}
                    onClick={() => setFilter('all')}
                >
                    All Orders
                </button>
                <button
                    className={filter === 'processing' ? 'active' : ''}
                    onClick={() => setFilter('processing')}
                >
                    Processing
                </button>
                <button
                    className={filter === 'shipped' ? 'active' : ''}
                    onClick={() => setFilter('shipped')}
                >
                    Shipped
                </button>
                <button
                    className={filter === 'delivered' ? 'active' : ''}
                    onClick={() => setFilter('delivered')}
                >
                    Delivered
                </button>
                <button
                    className={filter === 'cancelled' ? 'active' : ''}
                    onClick={() => setFilter('cancelled')}
                >
                    Cancelled
                </button>
            </div>

            {filteredOrders.length === 0 ? (
                <div className="no-orders">
                    <p>No orders found matching your filter.</p>
                    <Link to="/" className="continue-shopping">Continue Shopping</Link>
                </div>
            ) : (
                <div className="orders-list">
                    {filteredOrders.map(order => (
                        <div key={order.OrderID} className="order-card">
                            <div className="order-header">
                                <div>
                                    <h3>Order #{order.OrderID}</h3>
                                    <p>Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
                                </div>
                                <div>
                                    <p className={`status ${order.Status.toLowerCase()}`}>
                                        {order.Status}
                                    </p>
                                    <p className="total">Total: ${order.TotalAmount.toFixed(2)}</p>
                                </div>
                            </div>

                            <div className="order-items">
                                <h4>Items:</h4>
                                <ul>
                                    {order.Items.map(item => (
                                        <li key={`${order.OrderID}-${item.BookID}`}>
                                            {item.ProductName} x {item.Quantity} - ${item.Price.toFixed(2)} each
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="order-actions">
                                <button className="details-btn">View Details</button>
                                {order.Status === 'Processing' && (
                                    <button className="cancel-btn">Cancel Order</button>
                                )}
                                {order.Status === 'Delivered' && (
                                    <button className="review-btn">Leave Review</button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default OrderPage;