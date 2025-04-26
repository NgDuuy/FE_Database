import React from 'react';

const BookCard = ({ book, addToCart, isLoggedIn }) => {
    return (
        <div className="book-card">
            <div className="book-image">
                {/* Placeholder for book image */}
                <div className="image-placeholder">{book.ProductName.charAt(0)}</div>
            </div>
            <div className="book-details">
                <h3>{book.ProductName}</h3>
                <p>Author: {book.Author || 'Unknown'}</p>
                <p>Year: {book.PublicationYear}</p>
                <p>Category: {book.Category}</p>
                <p>Price: ${book.ProductPriceOut.toFixed(2)}</p>
                <p>In Stock: {book.ProductQuantity}</p>
                {isLoggedIn ? (
                    <button
                        onClick={() => addToCart(book)}
                        className="add-to-cart-btn"
                        disabled={book.ProductQuantity <= 0}
                    >
                        {book.ProductQuantity <= 0 ? 'Out of Stock' : 'Add to Cart'}
                    </button>
                ) : (
                    <p className="login-prompt">Please login to add to cart</p>
                )}
            </div>
        </div>
    );
};

export default BookCard;