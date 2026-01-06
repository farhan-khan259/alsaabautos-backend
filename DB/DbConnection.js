const mongoose = require("mongoose");
const dbURI = process.env.MONGO_URI;

mongoose
  .connect(dbURI)
  .then((db) => {
    console.log(
      "Connected to the " + db.connection.db.databaseName + " Database"
    );
  })
  .catch((err) => {
    console.log("Not connected to the database", err);
  });

module.exports = mongoose;