const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const noteRoutes = require('./routes/noteRoutes');
const patientRoutes = require('./routes/patientRoutes');
const audioRoutes = require('./routes/audioRoutes');
const aiRoutes = require('./routes/aiRoutes');
const { notFound, errorHandler } = require('./middlewares/errorMiddleware');

const app = express();
const helmet = require('helmet');
const compression = require('compression');
const rateLimit = require('express-rate-limit');

// ✅ Environment-based CORS origin setup
// Ensure the deployed frontend origin is set in CORS_ORIGIN (e.g. https://clinote.vercel.app)
// Do not use wildcard '*' with credentials: true. We don't use cookie-based auth here,
// so `credentials` is turned off and we explicitly allow the Authorization header.
const allowedOrigin = process.env.CORS_ORIGIN || '*';
app.use(cors({
  origin: allowedOrigin,
  credentials: false,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Security Headers
// Configure Helmet to allow Cross-Origin Resource Sharing (CORS)
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// Gzip Compression
app.use(compression());

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 1000, // Limit each IP to 1000 requests per windowMs (Increased for dev/testing)
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/notes', noteRoutes);
app.use('/api/audio', audioRoutes);
app.use('/api/ai', aiRoutes);


// Health check endpoints
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

app.head("/health", (req, res) => {
  res.status(200).end();
});


// Error Handling
app.use(notFound);
app.use(errorHandler);

// DB + Server Start
const connectDB = require('./config/db');
connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
