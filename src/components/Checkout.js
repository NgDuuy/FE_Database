
import React, { useState } from 'react';

const Checkout = ({ cart, totalPrice, onClose, user }) => {
    const [paymentMethod, setPaymentMethod] = useState('credit_card');
    const [deliveryDate, setDeliveryDate] = useState('');
    const [orderPlaced, setOrderPlaced] = useState(false);

    // Calculate delivery date (3 days from now)
    const today = new Date();
    const delivery = new Date(today);
    delivery.setDate(delivery.getDate() + 3);
    const defaultDeliveryDate = delivery.toISOString().split('T')[0];

    const handleSubmit = (e) => {
        e.preventDefault();
        // Here you would typically send the order to your backend
        console.log('Order placed:', {
            user: user.UserID,
            items: cart,
            total: totalPrice,
            paymentMethod,
            deliveryDate: deliveryDate || defaultDeliveryDate
        });
        setOrderPlaced(true);
    };

    if (orderPlaced) {
        return (
            <div className="checkout-modal">
                <div className="checkout-content">
                    <h2>Order Confirmed!</h2>
                    <p>Your order has been placed successfully.</p>
                    <p>Expected delivery date: {deliveryDate || defaultDeliveryDate}</p>
                    <button onClick={onClose} className="close-btn">Close</button>
                </div>
            </div>
        );
    }

    return (
        <div className="checkout-modal">
            <div className="checkout-content">
                <h2>Checkout</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Payment Method:</label>
                        <select
                            value={paymentMethod}
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        >
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="bank_transfer">Bank Transfer</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label>Delivery Date:</label>
                        <input
                            type="date"
                            min={defaultDeliveryDate}
                            value={deliveryDate}
                            onChange={(e) => setDeliveryDate(e.target.value)}
                        />
                        <small>Earliest delivery: {defaultDeliveryDate}</small>
                    </div>

                    <div className="order-summary">
                        <h3>Order Summary</h3>
                        {cart.map(item => (
                            <div key={item.BookID} className="order-item">
                                <span>{item.ProductName} x {item.quantity}</span>
                                <span>${(item.ProductPriceOut * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                        <div className="order-total">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>

                    <div className="form-actions">
                        <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
                        <button type="submit" className="confirm-btn">Place Order</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Checkout;