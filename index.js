const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
// Home route
app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the Node.js Backend API',
        version: '1.0.0',
        endpoints: {
            users: '/api/users',
            products: '/api/products',
            health: '/api/health'
        }
    });
});

// Health check route
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Users API routes
app.get('/api/users', (req, res) => {
    const users = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
        { id: 3, name: 'Bob Johnson', email: 'bob@example.com' }
    ];
    res.json({ success: true, data: users });
});

app.get('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const user = { id: userId, name: 'John Doe', email: 'john@example.com' };
    res.json({ success: true, data: user });
});

app.post('/api/users', (req, res) => {
    const { name, email } = req.body;
    const newUser = { id: Date.now(), name, email };
    res.status(201).json({ success: true, message: 'User created', data: newUser });
});

app.put('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const { name, email } = req.body;
    const updatedUser = { id: userId, name, email };
    res.json({ success: true, message: 'User updated', data: updatedUser });
});

app.delete('/api/users/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    res.json({ success: true, message: `User ${userId} deleted` });
});

// Products API routes
app.get('/api/products', (req, res) => {
    const products = [
        { id: 1, name: 'Laptop', price: 999.99, category: 'Electronics' },
        { id: 2, name: 'Phone', price: 699.99, category: 'Electronics' },
        { id: 3, name: 'Desk Chair', price: 199.99, category: 'Furniture' }
    ];
    res.json({ success: true, data: products });
});

app.get('/api/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = { id: productId, name: 'Laptop', price: 999.99, category: 'Electronics' };
    res.json({ success: true, data: product });
});

app.post('/api/products', (req, res) => {
    const { name, price, category } = req.body;
    const newProduct = { id: Date.now(), name, price, category };
    res.status(201).json({ success: true, message: 'Product created', data: newProduct });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ success: false, message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ success: false, message: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    console.log(`API endpoints available at http://localhost:${PORT}/api`);
});
