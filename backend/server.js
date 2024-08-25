// D:\Nxtwave\Blog-app\backend\server.js
require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const postRoutes = require('./routes/postRoutes');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

const app = express();


// Connect to the database
connectDB();
app.use(cors());

// Middleware
app.use(express.json());

// Routes
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));