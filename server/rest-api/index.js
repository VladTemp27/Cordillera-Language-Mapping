const express = require('express');
const { testConnection } = require('./services/dal-service/config/db');
require('dotenv').config();

const app = express();
const ethnicGroupRoutes = require('./routes/ethnicGroupRoutes');
const languageRoutes = require('./routes/languageRoutes');
const provinceRoutes = require('./routes/provinceRoutes');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API Routes
app.use('/api/ethnic-groups', ethnicGroupRoutes);
app.use('/api/languages', languageRoutes);  
app.use('/api/provinces', provinceRoutes);

// Health check endpoint
app.get("/status", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is up and running",
        timestamp: new Date()
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        status: "error",
        message: "Something went wrong!"
    });
});

// Environment variables
const PORT = process.env.PORT || 3000;

// Start server
const startServer = async () => {
    try {
        // Test database connection
        const isConnected = await testConnection();
        if (!isConnected) {
            throw new Error('Failed to connect to database');
        }
        console.log('Database connected successfully');

        // Start listening
        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
            console.log(`Health check: http://localhost:${PORT}/health`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

// Handle graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received. Closing HTTP server...');
    await closePool();
    process.exit(0);
});

startServer();