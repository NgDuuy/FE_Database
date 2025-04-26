const cart = {
    // Get cart from localStorage
    getCart: () => {
        const cart = localStorage.getItem('cart');
        return cart ? JSON.parse(cart) : [];
    },

    // Save cart to localStorage
    saveCart: (cartItems) => {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    },

    // Add item to cart
    addItem: (book, quantity = 1) => {
        const cartItems = cart.getCart();
        const existingItem = cartItems.find(item => item.BookID === book.BookID);

        if (existingItem) {
            // Update quantity if item already exists
            existingItem.quantity += quantity;
        } else {
            // Add new item to cart
            cartItems.push({
                ...book,
                quantity
            });
        }

        cart.saveCart(cartItems);
        return cartItems;
    },

    // Remove item from cart
    removeItem: (bookId) => {
        const cartItems = cart.getCart().filter(item => item.BookID !== bookId);
        cart.saveCart(cartItems);
        return cartItems;
    },

    // Update item quantity in cart
    updateQuantity: (bookId, newQuantity) => {
        if (newQuantity < 1) return cart.getCart();

        const cartItems = cart.getCart().map(item =>
            item.BookID === bookId ? { ...item, quantity: newQuantity } : item
        );

        cart.saveCart(cartItems);
        return cartItems;
    },

    // Clear the cart
    clearCart: () => {
        localStorage.removeItem('cart');
        return [];
    },

    // Calculate total items in cart
    getTotalItems: () => {
        const cartItems = cart.getCart();
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    },

    // Calculate total price of cart
    getTotalPrice: () => {
        const cartItems = cart.getCart();
        return cartItems.reduce((total, item) => total + (item.ProductPriceOut * item.quantity), 0);
    },

    // Check if cart is empty
    isEmpty: () => {
        return cart.getTotalItems() === 0;
    }
};

export default cart;    