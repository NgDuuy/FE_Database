import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import CartPage from './pages/CartPage';
import OrderPage from './pages/OrderPage';
import ProfilePage from './pages/ProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import Login from './components/Login';
import Register from './components/Register';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [books, setBooks] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [orders, setOrders] = useState([]); // Thêm state cho orders

  useEffect(() => {
    // Fetch books from API
    const fetchBooks = async () => {
      // Mock data - replace with actual API call
      const mockBooks = [
        { BookID: 1, ProductName: 'React Fundamentals', ProductPriceOut: 29.99, ProductQuantity: 10, PublicationYear: 2023, Category: 'Programming' },
        { BookID: 2, ProductName: 'Database Design', ProductPriceOut: 39.99, ProductQuantity: 5, PublicationYear: 2022, Category: 'Database' },
      ];
      setBooks(mockBooks);
    };

    fetchBooks();
  }, []);

  const addToCart = (book) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.BookID === book.BookID);
      if (existingItem) {
        return prevCart.map(item =>
          item.BookID === book.BookID
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prevCart, { ...book, quantity: 1 }];
    });
  };

  const removeFromCart = (bookId) => {
    setCart(prevCart => prevCart.filter(item => item.BookID !== bookId));
  };

  const updateQuantity = (bookId, newQuantity) => {
    if (newQuantity < 1) return;

    setCart(prevCart =>
      prevCart.map(item =>
        item.BookID === bookId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  // Hàm xử lý thanh toán
  const handleCheckout = (orderData) => {
    const newOrder = {
      ...orderData,
      orderId: Date.now(), // Tạo ID đơn hàng
      date: new Date().toISOString(),
      status: 'completed'
    };

    setOrders(prevOrders => [...prevOrders, newOrder]);
    setCart([]); // Xóa giỏ hàng sau khi thanh toán

    // Trả về thông tin đơn hàng để hiển thị xác nhận
    return newOrder;
  };

  const loginUser = (userData) => {
    setUser(userData);
    setIsLoginOpen(false);
  };

  const logoutUser = () => {
    setUser(null);
  };

  const registerUser = (userData) => {
    console.log('Registering user:', userData);
    setIsRegisterOpen(false);
    setIsLoginOpen(true);
  };

  return (
    <Router>
      <div className="App">
        <Header
          user={user}
          cartItemCount={cart.reduce((sum, item) => sum + item.quantity, 0)}
          onLoginClick={() => setIsLoginOpen(true)}
          onLogoutClick={logoutUser}
        />

        {isLoginOpen && (
          <Login
            onClose={() => setIsLoginOpen(false)}
            onLogin={loginUser}
            onRegisterClick={() => {
              setIsLoginOpen(false);
              setIsRegisterOpen(true);
            }}
          />
        )}

        {isRegisterOpen && (
          <Register
            onClose={() => setIsRegisterOpen(false)}
            onRegister={registerUser}
          />
        )}

        <Routes>
          <Route path="/" element={
            <Home
              books={books}
              addToCart={addToCart}
              user={user}
            />
          } />
          <Route path="/cart" element={
            <CartPage
              cart={cart}
              removeFromCart={removeFromCart}
              updateQuantity={updateQuantity}
              user={user}
            />
          } />
          <Route path="/checkout" element={
            <CheckoutPage
              cart={cart}
              onCheckout={handleCheckout}
              user={user}
            />
          } />
          <Route path="/orders" element={
            <OrderPage
              user={user}
              orders={orders}
            />
          } />
          <Route path="/profile" element={
            <ProfilePage
              user={user}
              orders={orders}
            />
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;