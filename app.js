// // const express = require('express');
// // const cors = require('cors');
// // const path = require('path');
// // const app = express();

// // app.use(cors());
// // app.use(express.json());
// // const AppError = require('./utils/appError');

// // // Serve static files for uploads
// // app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// // const server = require('http').createServer(app);
// // // initSocket(server);

// // const apiVersion = "/api/v1"

// // /****************  Routes  **********************/
// // const authRouter = require('./Routes/authRoutes');
// // const unitRouter = require('./Routes/unitRoutes');
// // const investorRouter = require('./Routes/investorRoutes');
// // const expenseRouter = require('./Routes/expenseRoutes');
// // const paymentRouter = require('./Routes/paymentRoutes');
// // const reportRouter = require('./Routes/reportRoutes');

// // app.use(`${apiVersion}/auth`, authRouter);
// // app.use(`${apiVersion}/units`, unitRouter);
// // app.use(`${apiVersion}/investors`, investorRouter);
// // app.use(`${apiVersion}/expenses`, expenseRouter);
// // app.use(`${apiVersion}/payments`, paymentRouter);
// // app.use(`${apiVersion}/reports`, reportRouter);

// // app.get("/test", (req, res) => {
// //   res.status(200).send("test is working!")
// // });

// // // Error handling
// // app.all('*', (req, res, next) => {
// //   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// // });

// // module.exports = { app, server };




// // index.js (main entry point)
// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');
// const path = require('path');
// const http = require('http');
// const connectDB = require('./DB/DbConnection');
// const AppError = require('./utils/appError');

// const app = express();

// app.use(cors());
// app.use(express.json());

// // Serve static files for uploads
// app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// const apiVersion = "/api/v1"

// /****************  Routes  **********************/
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
//   res.status(200).json({
//     status: 'success',
//     message: 'AL Saab Autos Backend API',
//     timestamp: new Date().toISOString()
//   });
// });

// app.get("/test", (req, res) => {
//   res.status(200).send("test is working!");
// });

// // Error handling
// app.all('*', (req, res, next) => {
//   next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// });

// // Global error handler
// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || 'error';

//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message
//   });
// });

// const PORT = process.env.PORT || 9005;
// const server = http.createServer(app);

// // Connect to DB and start server
// connectDB()
//   .then(() => {
//     server.listen(PORT, () => {
//       console.log(`🚀 Server running on port ${PORT}`);
//       console.log(`📡 Environment: ${process.env.NODE_ENV || 'development'}`);
//     });
//   })
//   .catch((error) => {
//     console.error('❌ Failed to start server:', error);
//     process.exit(1);
//   });

// // Handle shutdown gracefully
// process.on('SIGTERM', () => {
//   console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
//   server.close(() => {
//     console.log('💥 Process terminated!');
//   });
// });