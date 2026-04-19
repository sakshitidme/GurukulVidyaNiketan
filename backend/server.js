const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
const allowedOrigins = process.env.CORS_ORIGIN
  ? [process.env.CORS_ORIGIN, 'http://localhost:5173']
  : ['http://localhost:5173'];

app.use(cors({
  origin: (origin, callback) => {
    // allow requests with no origin (e.g. mobile apps, curl, Postman)
    if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error(`CORS blocked: origin ${origin} not allowed`));
  },
  credentials: true
}));
app.use(express.json());

// Middleware removed to allow Razorpay order testing

// Serve uploads as static files
const path = require('path');
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Basic Route
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Backend is running smoothly' });
});

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gurukul';
const PORT = process.env.PORT || 5000;

// Routes
const contactRoutes = require('./routes/contactRoutes');
const admissionRoutes = require('./routes/admissionRoutes');
const adminRoutes = require('./routes/adminRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

app.use('/api/contact', contactRoutes);
app.use('/api/admissions', (req, res, next) => {
  console.log(`[API] ${req.method} ${req.path}`);
  next();
}, admissionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/reviews', reviewRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  
  // Temporary bypass: disable MongoDB connection so OTP testing can proceed without auth blocking the server
  // mongoose.connect(MONGODB_URI)
  //   .then(() => {
  //     console.log('✅ Connected to MongoDB');
  //   })
  //   .catch((err) => {
  //     console.error('❌ MongoDB Connection Error:', err.message);
  //   });
});

