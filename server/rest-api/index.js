const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Environment variables
const PORT = process.env.PORT || 8080;

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

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});