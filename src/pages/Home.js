import React from 'react';
import BookCard from '../components/BookCard';

const Home = ({ books, addToCart, user }) => {
    return (
        <div className="home-page">
            <div className="banner">
                <h1>Welcome to Our Bookstore</h1>
                <p>Discover your next favorite book</p>
            </div>

            <div className="book-list">
                <h2>Featured Books</h2>
                <div className="books-container">
                    {books.map(book => (
                        <BookCard
                            key={book.BookID}
                            book={book}
                            addToCart={addToCart}
                            isLoggedIn={!!user}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Home;