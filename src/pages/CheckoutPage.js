import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CheckoutSuccess from '../components/CheckoutSuccess';

const CheckoutPage = ({ cart, onCheckout, user }) => {
    const [showSuccess, setShowSuccess] = useState(false);
    const [orderDetails, setOrderDetails] = useState(null);
    const [isProcessing, setIsProcessing] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            navigate('/login');
            return;
        }

        setIsProcessing(true);

        try {
            const result = await onCheckout({
                method: 'credit_card', // Có thể thay đổi thành phương thức thanh toán thực tế
                address: '123 Main St' // Địa chỉ từ form
            });

            if (result.success) {
                setOrderDetails(result.order);
                setShowSuccess(true);
            }
        } catch (error) {
            console.error('Checkout failed:', error);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <div className="checkout-page">
            <h1>Checkout</h1>

            <form onSubmit={handleSubmit}>
                {/* Các trường thông tin thanh toán đơn giản */}
                <div className="form-group">
                    <label>Payment Method:</label>
                    <select required>
                        <option value="credit_card">Credit Card</option>
                        <option value="paypal">PayPal</option>
                        <option value="cod">Cash on Delivery</option>
                    </select>
                </div>

                <div className="form-group">
                    <label>Shipping Address:</label>
                    <textarea required placeholder="Enter your shipping address" />
                </div>

                <button type="submit" disabled={isProcessing || cart.length === 0}>
                    {isProcessing ? 'Processing...' : 'Place Order'}
                </button>
            </form>

            {showSuccess && orderDetails && (
                <CheckoutSuccess
                    orderDetails={orderDetails}
                    onClose={() => {
                        setShowSuccess(false);
                        navigate('/orders');
                    }}
                />
            )}
        </div>
    );
};

export default CheckoutPage;