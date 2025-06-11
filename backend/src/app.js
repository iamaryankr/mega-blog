require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const cors = require('cors');
const postsRouter = require('./routes/posts');
const imagesRouter = require('./routes/images');

const placeholderRouter = require('./controllers/placeholderController');

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/posts', postsRouter);
app.use('/api/images', imagesRouter);

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log('🗄️  Connected to MongoDB Atlas'))
  .catch((err) => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/placeholder', placeholderRouter);

// Healthcheck
app.get('/', (req, res) => res.json({ status: 'API is running 🚀' }));

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
