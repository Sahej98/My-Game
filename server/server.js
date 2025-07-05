require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRouter = require('./routes/authRoute');
const userRouter = require('./routes/userRoute');
const buildingsRouter = require('./routes/buildingRoute');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/', (req, res) => res.send('🟢 API is running'));

// Routes
app.use('/api/auth', authRouter);
app.use('/api/buildings', buildingsRouter);
app.use('/api', userRouter);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ message: '❌ Route not found' });
});

// Error Handler (optional)
app.use((err, req, res, next) => {
  console.error('🔥 Server error:', err);
  res.status(500).json({ message: 'Server error', error: err.message });
});

// Connect DB and Start Server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    const port = process.env.PORT || 5000;
    app.listen(port, () => console.log(`🚀 Server up on port ${port}`));
  })
  .catch(err => console.error('❌ DB connection failed:', err));
