const mongoose = require("mongoose");
require("dotenv").config();


if (!process.env.MONGO_URI) {
  console.log("No DB_URL found in .env configuration");
}

mongoose // connect to mongoDB and send message to console on success or failure
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    ssl: true, // use ssl to connect to mongoDB
  })
  .then(() => {
    console.log("connected to database 📡"); // log a success message colored in green
  })
  .catch((error) => {
    console.log("Database connection error: ❌ " + error); // log a colored error message
  });

  module.exports = mongoose.connection;                                   