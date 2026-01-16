// require("dotenv").config();
// require("./DB/DbConnection");
// const {app, server} = require('./app');
// const port = process.env.LOCAL_PORT || 9005;

// server.listen(port, () => {
//     console.log("Server is running on port " + port);
//   });


// // server.js
// require('dotenv').config();
// const connectDB = require('./DB/DbConnection'); // Import the function
// const { app, server } = require('./app');

// const PORT = process.env.PORT || 9005;

// // Connect to DB then start server
// connectDB().then(() => {
//   server.listen(PORT, () => {
//     console.log(`🚀 Server running on port ${PORT}`);
//   });
// });



require('dotenv').config();
const http = require('http');
const connectDB = require('./DB/DbConnection');
const app = require('./app'); // Import the app

const PORT = process.env.PORT || 9005;

// Create server from the app
const server = http.createServer(app);

// Connect to DB then start server
connectDB()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Failed to start server:', error);
    process.exit(1);
  });

// Handle uncaught errors
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});