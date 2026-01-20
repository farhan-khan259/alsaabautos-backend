// // index.js - UPDATED FOR PRODUCTION
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const mongoose = require('mongoose');
// const compression = require('compression'); // Added for performance
// const helmet = require('helmet'); // Added for security

// const AppError = require('./utils/appError');

// const app = express();

// // Security middleware
// app.use(helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" } // Allow cross-origin resources for uploads
// }));

// // CORS configuration for frontend
// const allowedOrigins = [
//     'https://alsaabautos-frontend.onrender.com', // Your frontend on Render
//     'https://www.alsaabautos.site',      // Your custom domain
//     'https://alsaabautos.site',          // Also allow without www
//     'http://localhost:3000', // React dev server
//     'http://localhost:5173', // Vite dev server
//     process.env.FRONTEND_URL // Optional: from environment variable
// ].filter(Boolean); // Remove undefined values

// const corsOptions = {
//     origin: function (origin, callback) {
//         // Allow requests with no origin (like mobile apps or curl requests)
//         if (!origin) return callback(null, true);

//         if (allowedOrigins.includes(origin) || allowedOrigins.includes('*')) {
//             callback(null, true);
//         } else {
//             console.log('CORS blocked for origin:', origin);
//             callback(new Error('Not allowed by CORS'));
//         }
//     },
//     credentials: true,
//     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
//     allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
//     exposedHeaders: ['Content-Disposition']
// };

// app.use(cors(corsOptions));

// // Performance middleware
// app.use(compression());
// app.use(express.json({ limit: '10mb' })); // Increased limit for file uploads
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Request logging middleware (simple version)
// app.use((req, res, next) => {
//     console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
//     next();
// });

// // Serve static files for uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads'), {
//     maxAge: '1d', // Cache for 1 day
//     setHeaders: (res, path) => {
//         if (path.endsWith('.jpg') || path.endsWith('.png') || path.endsWith('.jpeg')) {
//             res.setHeader('Content-Type', 'image/jpeg');
//         } else if (path.endsWith('.pdf')) {
//             res.setHeader('Content-Type', 'application/pdf');
//         }
//     }
// }));

// // Health check route (Render monitors this)
// app.get('/health', (req, res) => {
//     res.status(200).json({
//         status: 'healthy',
//         timestamp: new Date().toISOString(),
//         service: 'AL Saab Autos Backend',
//         uptime: process.uptime(),
//         memory: process.memoryUsage(),
//         environment: process.env.NODE_ENV || 'development'
//     });
// });

// const apiVersion = "/api/v1"

// // Routes
// const authRouter = require('./Routes/authRoutes');
// const unitRouter = require('./Routes/unitRoutes');
// const investorRouter = require('./Routes/investorRoutes');
// const expenseRouter = require('./Routes/expenseRoutes');
// const paymentRouter = require('./Routes/paymentRoutes');
// const reportRouter = require('./Routes/reportRoutes');

// app.use(`${apiVersion}/auth`, authRouter);
// app.use(`${apiVersion}/units`, unitRouter);
// app.use(`${apiVersion}/investors`, investorRouter);
// app.use(`${apiVersion}/expenses`, expenseRouter);
// app.use(`${apiVersion}/payments`, paymentRouter);
// app.use(`${apiVersion}/reports`, reportRouter);

// // Root route for Render health checks
// app.get('/', (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         message: 'AL Saab Autos Backend API',
//         version: '1.0.0',
//         timestamp: new Date().toISOString(),
//         endpoints: {
//             auth: `${apiVersion}/auth`,
//             units: `${apiVersion}/units`,
//             investors: `${apiVersion}/investors`,
//             expenses: `${apiVersion}/expenses`,
//             payments: `${apiVersion}/payments`,
//             reports: `${apiVersion}/reports`,
//             uploads: '/uploads',
//             health: '/health'
//         }
//     });
// });

// app.get("/test", (req, res) => {
//     res.status(200).json({
//         status: 'success',
//         message: 'test is working!',
//         timestamp: new Date().toISOString()
//     });
// });

// // Error handling
// app.all('*', (req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// // Global error handler
// app.use((err, req, res, next) => {
//     err.statusCode = err.statusCode || 500;
//     err.status = err.status || 'error';

//     // Log error for debugging
//     console.error('Error:', {
//         message: err.message,
//         stack: err.stack,
//         url: req.originalUrl,
//         method: req.method,
//         ip: req.ip
//     });

//     // Don't leak error details in production
//     const errorResponse = process.env.NODE_ENV === 'production' && err.statusCode === 500
//         ? 'Something went wrong!'
//         : err.message;

//     res.status(err.statusCode).json({
//         status: err.status,
//         message: errorResponse,
//         ...(process.env.NODE_ENV !== 'production' && { stack: err.stack })
//     });
// });

// // Database connection with better configuration
// const MONGODB_URI = process.env.MONGODB_URI ||
//     'mongodb+srv://mfarhankhan068:MDKMqLJZ0inz9fv7@cluster0.ttfk3ui.mongodb.net/alsaabautos?retryWrites=true&w=majority';

// console.log('🚀 Starting AL Saab Autos Backend Server...');
// console.log('📁 Environment:', process.env.NODE_ENV || 'development');
// console.log('🔗 MongoDB URI exists:', !!process.env.MONGODB_URI);
// console.log('🌐 Allowed CORS origins:', allowedOrigins);

// // MongoDB connection options
// const mongooseOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     serverSelectionTimeoutMS: 5000, // Timeout after 5s
//     socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
//     family: 4 // Use IPv4, skip trying IPv6
// };

// // Connect to MongoDB
// mongoose.connect(MONGODB_URI, mongooseOptions)
//     .then(() => {
//         console.log('✅ MongoDB Connected Successfully');
//         console.log(`📊 Database: ${mongoose.connection.db.databaseName}`);

//         const PORT = process.env.PORT || 9005;
//         const server = app.listen(PORT, () => {
//             console.log(`🚀 Server running on port ${PORT}`);
//             console.log(`🌍 Health check: http://localhost:${PORT}/health`);
//             console.log(`📡 API Base URL: http://localhost:${PORT}${apiVersion}`);
//         });

//         // Handle server errors
//         server.on('error', (error) => {
//             console.error('Server error:', error);
//             if (error.code === 'EADDRINUSE') {
//                 console.error(`Port ${PORT} is already in use`);
//             }
//             process.exit(1);
//         });

//         // Graceful shutdown
//         const gracefulShutdown = () => {
//             console.log('👋 Received shutdown signal, closing server...');
//             server.close(() => {
//                 console.log('✅ Server closed');
//                 mongoose.connection.close(false, () => {
//                     console.log('✅ MongoDB connection closed');
//                     process.exit(0);
//                 });
//             });

//             // Force close after 10 seconds
//             setTimeout(() => {
//                 console.error('❌ Could not close connections in time, forcefully shutting down');
//                 process.exit(1);
//             }, 10000);
//         };

//         process.on('SIGTERM', gracefulShutdown);
//         process.on('SIGINT', gracefulShutdown);
//     })
//     .catch((error) => {
//         console.error('❌ MongoDB Connection Error:', error.message);
//         if (error.name === 'MongoServerSelectionError') {
//             console.error('🔧 Check your MongoDB connection string and network connectivity');
//         }
//         console.error('Full error:', error);
//         process.exit(1);
//     });

// // Handle unhandled rejections
// process.on('unhandledRejection', (err) => {
//     console.error('💥 UNHANDLED REJECTION! Shutting down...');
//     console.error('Error name:', err.name);
//     console.error('Error message:', err.message);
//     console.error('Error stack:', err.stack);

//     // Close server gracefully
//     const server = app.listen();
//     if (server) {
//         server.close(() => {
//             process.exit(1);
//         });
//     } else {
//         process.exit(1);
//     }
// });

// // Handle uncaught exceptions
// process.on('uncaughtException', (err) => {
//     console.error('💥 UNCAUGHT EXCEPTION! Shutting down...');
//     console.error('Error:', err);
//     process.exit(1);
// });

// // Add to package.json dependencies:
// // "compression": "^1.7.4",
// // "helmet": "^7.1.0"







// New updated code for the units 


// index.js - UPDATED TO MATCH LOCALHOST VERSION
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
// const compression = require('compression'); // Commented out - might cause issues
// const helmet = require('helmet'); // Commented out - causing FormData issues

const AppError = require('./utils/appError');

const app = express();

// Security middleware - COMMENTED OUT TEMPORARILY
// app.use(helmet({
//     crossOriginResourcePolicy: { policy: "cross-origin" } // Allow cross-origin resources for uploads
// }));

// CORS configuration - SIMPLIFIED TO MATCH LOCALHOST
// Use same CORS as localhost
app.use(cors());

// Performance middleware - COMMENTED OUT TEMPORARILY
// app.use(compression());

// Use same limits as localhost (or increase for uploads)
app.use(express.json({ limit: '50mb' })); // Increased for file uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Request logging middleware (simple version)
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
    next();
});

// Serve static files for uploads - SIMPLIFIED
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'healthy' });
});

const apiVersion = "/api/v1"

// Routes
const authRouter = require('./Routes/authRoutes');
const unitRouter = require('./Routes/unitRoutes');
const investorRouter = require('./Routes/investorRoutes');
const expenseRouter = require('./Routes/expenseRoutes');
const paymentRouter = require('./Routes/paymentRoutes');
const reportRouter = require('./Routes/reportRoutes');

app.use(`${apiVersion}/auth`, authRouter);
app.use(`${apiVersion}/units`, unitRouter);
app.use(`${apiVersion}/investors`, investorRouter);
app.use(`${apiVersion}/expenses`, expenseRouter);
app.use(`${apiVersion}/payments`, paymentRouter);
app.use(`${apiVersion}/reports`, reportRouter);

// Root route
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'AL Saab Autos Backend API'
    });
});

app.get("/test", (req, res) => {
    res.status(200).send("test is working!");
});

// Error handling - SAME AS LOCALHOST
app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global error handler - SIMPLIFIED
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // Log error for debugging
    console.error('Error:', err.message);

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message
    });
});

// Database connection
const MONGODB_URI = process.env.MONGODB_URI ||
    'mongodb+srv://mfarhankhan068:MDKMqLJZ0inz9fv7@cluster0.ttfk3ui.mongodb.net/alsaabautos?retryWrites=true&w=majority';

console.log('🚀 Starting AL Saab Autos Backend Server...');
console.log('📁 Environment:', process.env.NODE_ENV || 'development');
console.log('🔗 MongoDB URI exists:', !!process.env.MONGODB_URI);

// MongoDB connection options - SIMPLIFIED
mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('✅ MongoDB Connected Successfully');

        const PORT = process.env.PORT || 9005;
        const server = app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
            console.log(`🌍 Health check: http://localhost:${PORT}/health`);
            console.log(`📡 API Base URL: http://localhost:${PORT}${apiVersion}`);
        });

        // Graceful shutdown
        const gracefulShutdown = () => {
            console.log('👋 Received shutdown signal, closing server...');
            server.close(() => {
                console.log('✅ Server closed');
                mongoose.connection.close(false, () => {
                    console.log('✅ MongoDB connection closed');
                    process.exit(0);
                });
            });
        };

        process.on('SIGTERM', gracefulShutdown);
        process.on('SIGINT', gracefulShutdown);
    })
    .catch((error) => {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    });