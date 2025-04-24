const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const app = express();

dotenv.config('./.env');

const PORT = process.env.PORT || 2019;
const publicPath = path.join(__dirname, 'public');


app.use(express.json());

// Serves the compiled React app from the 'dist' directory
app.use(express.static(path.join(publicPath, 'dist')));

app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Resource server is healthy' });
})

// Backfall to serve routes that are handled by the React app
app.get('*', (req, res) => {
    res.sendFile(path.join(publicPath,'dist', 'index.html'));    
})

app.listen(PORT, () => {
    console.log(`Resource server is running on port ${PORT}`);
})