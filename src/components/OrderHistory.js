import React, { useState, useEffect } from 'react';

const OrderHistory = ({ userId }) => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

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
                // Add more orders...
            ];

            setTimeout(() => {
                setOrders(mockOrders);
                setLoading(false);
            }, 500);
        };

        fetchOrders();
    }, [userId]);

    if (loading) {
        return <p>Loading order history...</p>;
    }

    if (orders.length === 0) {
        return <p>No orders found.</p>;
    }

    return (
        <div className="order-history">
            {orders.map(order => (
                <div key={order.OrderID} className="order-card">
                    <div className="order-header">
                        <div>
                            <h3>Order #{order.OrderID}</h3>
                            <p>Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p className={`status ${order.Status.toLowerCase()}`}>{order.Status}</p>
                            <p className="total">Total: ${order.TotalAmount.toFixed(2)}</p>
                        </div>
                    </div>

                    <div className="order-items">
                        <h4>Items:</h4>
                        <ul>
                            {order.Items.map(item => (
                                <li key={item.BookID}>
                                    {item.ProductName} x {item.Quantity} - ${item.Price.toFixed(2)} each
                                </li>
                            ))}
                        </ul>
                    </div>

                    <button className="details-btn">View Details</button>
                </div>
            ))}
        </div>
    );
};

export default OrderHistory;