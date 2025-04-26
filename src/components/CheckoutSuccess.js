import React from 'react';
import { useNavigate } from 'react-router-dom';

const CheckoutSuccess = ({ orderDetails, onClose }) => {
    const navigate = useNavigate();

    return (
        <div className="checkout-success-modal">
            <div className="checkout-success-content">
                <h2>Order Confirmed!</h2>
                <p>Your order #{orderDetails.orderId} has been placed successfully.</p>
                <p>Expected delivery: {orderDetails.deliveryDate}</p>

                <div className="order-summary">
                    <h3>Order Summary</h3>
                    <p>Total: ${orderDetails.total.toFixed(2)}</p>
                    <p>Payment Method: {orderDetails.paymentMethod}</p>
                </div>

                <div className="action-buttons">
                    <button onClick={() => navigate('/orders')}>View Orders</button>
                    <button onClick={onClose}>Continue Shopping</button>
                </div>
            </div>
        </div>
    );
};

export default CheckoutSuccess;