// const mongoose = require("mongoose");
// const dbURI = process.env.MONGO_URI;

// mongoose
//   .connect(dbURI)
//   .then((db) => {
//     console.log(
//       "Connected to the " + db.connection.db.databaseName + " Database"
//     );
//   })
//   .catch((err) => {
//     console.log("Not connected to the database", err);
//   });

// module.exports = mongoose;



// DB/DbConnection.js - Better version
require('dotenv').config();
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const dbURI = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!dbURI) {
      throw new Error("No MongoDB connection string found in environment variables");
    }

    const conn = await mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📁 Database: ${conn.connection.db.databaseName}`);
    return conn;
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;