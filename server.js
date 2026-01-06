require("dotenv").config();
require("./DB/DbConnection");
const {app, server} = require('./app');
const port = process.env.LOCAL_PORT || 9005;

server.listen(port, () => {
    console.log("Server is running on port " + port);
  });