import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Checkout from '../components/Checkout';

const CartPage = ({ cart, removeFromCart, updateQuantity, user }) => {
    const [showCheckout, setShowCheckout] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Calculate total price and shipping
    const subtotal = cart.reduce((sum, item) => sum + (item.ProductPriceOut * item.quantity), 0);
    const shippingFee = subtotal > 50 ? 0 : 5; // Free shipping for orders over $50
    const totalPrice = subtotal + shippingFee;

    // Handle quantity changes with validation
    const handleQuantityChange = (bookId, newQuantity) => {
        if (newQuantity < 1) return;
        const book = cart.find(item => item.BookID === bookId);

        // Check stock availability
        if (newQuantity > book.ProductQuantity) {
            setError(`Only ${book.ProductQuantity} available in stock`);
            return;
        }

        setError('');
        updateQuantity(bookId, newQuantity);
    };

    // Proceed to checkout with validation
    const proceedToCheckout = () => {
        setLoading(true); // Set loading when starting checkout
        const outOfStockItems = cart.filter(item => item.quantity > item.ProductQuantity);

        if (outOfStockItems.length > 0) {
            setError(`Some items in your cart exceed available stock`);
            setLoading(false); // Reset loading if error
            return;
        }

        setShowCheckout(true);
        setLoading(false); // Reset loading after showing checkout
    };

    return (
        <div className="cart-page">
            <h1>Your Shopping Cart</h1>

            {error && <div className="error-message">{error}</div>}

            {cart.length === 0 ? (
                <div className="empty-cart">
                    <p>Your cart is empty</p>
                    <Link to="/" className="continue-shopping">Continue Shopping</Link>
                </div>
            ) : (
                <>
                    <div className="cart-items">
                        {cart.map(item => (
                            <div key={item.BookID} className="cart-item">
                                <div className="item-image">
                                    <img
                                        src={item.imageUrl || '/placeholder-book.jpg'}
                                        alt={item.ProductName}
                                        onError={(e) => {
                                            e.target.src = '/placeholder-book.jpg';
                                        }}
                                    />
                                </div>
                                <div className="item-info">
                                    <h3>
                                        <Link to={`/books/${item.BookID}`}>{item.ProductName}</Link>
                                    </h3>
                                    <p>Price: ${item.ProductPriceOut.toFixed(2)}</p>
                                    <p className="stock-status">
                                        {item.ProductQuantity > 0
                                            ? `${item.ProductQuantity} in stock`
                                            : 'Out of stock'}
                                    </p>
                                </div>
                                <div className="item-quantity">
                                    <button
                                        onClick={() => handleQuantityChange(item.BookID, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                    >
                                        -
                                    </button>
                                    <span>{item.quantity}</span>
                                    <button
                                        onClick={() => handleQuantityChange(item.BookID, item.quantity + 1)}
                                        disabled={item.quantity >= item.ProductQuantity}
                                    >
                                        +
                                    </button>
                                </div>
                                <div className="item-total">
                                    ${(item.ProductPriceOut * item.quantity).toFixed(2)}
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.BookID)}
                                    className="remove-btn"
                                    aria-label={`Remove ${item.ProductName} from cart`}
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>

                    <div className="cart-summary">
                        <h3>Order Summary</h3>
                        <div className="summary-row">
                            <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items):</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                            <span>Shipping:</span>
                            <span>
                                {shippingFee > 0
                                    ? `$${shippingFee.toFixed(2)}`
                                    : 'FREE'}
                            </span>
                        </div>
                        {subtotal < 50 && (
                            <div className="free-shipping-note">
                                Spend ${(50 - subtotal).toFixed(2)} more for free shipping!
                            </div>
                        )}
                        <div className="summary-row total">
                            <span>Total:</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>

                        {user ? (
                            <button
                                onClick={proceedToCheckout}
                                className="checkout-btn"
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : 'Proceed to Checkout'}
                            </button>
                        ) : (
                            <>
                                <p className="login-prompt">Please login to checkout</p>
                                <button
                                    onClick={() => navigate('/login', { state: { from: '/cart' } })}
                                    className="login-btn"
                                >
                                    Login
                                </button>
                            </>
                        )}
                    </div>

                    {showCheckout && (
                        <Checkout
                            cart={cart}
                            totalPrice={totalPrice}
                            onClose={() => setShowCheckout(false)}
                            user={user}
                        />
                    )}
                </>
            )}
        </div>
    );
};

export default CartPage;