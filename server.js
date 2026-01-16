// require("dotenv").config();
// require("./DB/DbConnection");
// const {app, server} = require('./app');
// const port = process.env.LOCAL_PORT || 9005;

// server.listen(port, () => {
//     console.log("Server is running on port " + port);
//   });


// server.js
require('dotenv').config();
const connectDB = require('./DB/DbConnection'); // Import the function
const { app, server } = require('./app');

const PORT = process.env.PORT || 9005;

// Connect to DB then start server
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});