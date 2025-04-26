const API_BASE_URL = 'http://localhost:8080/api';

const getAuthHeader = () => {
    const token = localStorage.getItem('token');
    return token ? { 'Authorization': `Bearer ${token}` } : {};
};

const api = {
    // Book endpoints
    getBooks: async (searchTerm = '', category = '') => {
        try {
            const response = await fetch(`${API_BASE_URL}/books?search=${encodeURIComponent(searchTerm)}&category=${encodeURIComponent(category)}`);
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching books:', error);
            throw error;
        }
    },

    getBookById: async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/books/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch book details');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching book by ID:', error);
            throw error;
        }
    },

    // User endpoints
    getUser: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                headers: {
                    ...getAuthHeader()
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch user');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },

    updateUser: async (userId, userData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(userData)
            });
            if (!response.ok) {
                throw new Error('Failed to update user');
            }
            return response.json();
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    // Order endpoints
    getOrders: async (userId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders?userId=${userId}`, {
                headers: {
                    ...getAuthHeader()
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch orders');
            }
            return response.json();
        } catch (error) {
            console.error('Error fetching orders:', error);
            throw error;
        }
    },

    createOrder: async (orderData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(orderData)
            });
            if (!response.ok) {
                throw new Error('Failed to create order');
            }
            return response.json();
        } catch (error) {
            console.error('Error creating order:', error);
            throw error;
        }
    },

    cancelOrder: async (orderId) => {
        try {
            const response = await fetch(`${API_BASE_URL}/orders/${orderId}/cancel`, {
                method: 'PUT',
                headers: {
                    ...getAuthHeader()
                }
            });
            if (!response.ok) {
                throw new Error('Failed to cancel order');
            }
            return response.json();
        } catch (error) {
            console.error('Error cancelling order:', error);
            throw error;
        }
    },

    // Review endpoints
    createReview: async (reviewData) => {
        try {
            const response = await fetch(`${API_BASE_URL}/reviews`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    ...getAuthHeader()
                },
                body: JSON.stringify(reviewData)
            });
            if (!response.ok) {
                throw new Error('Failed to create review');
            }
            return response.json();
        } catch (error) {
            console.error('Error creating review:', error);
            throw error;
        }
    }
};

export default api;
