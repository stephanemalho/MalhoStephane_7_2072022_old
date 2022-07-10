const express = require("express"); // import express
const cors = require("cors"); // import cors
const app = express();
require("./app/config/db.config");
module.exports = "dotenv";

// To Reduce Fingerprinting disable x-powered-by header
app.disable('x-powered-by'); 

// header settings 
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // * means all origins are allowed to access the server
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // allow headers
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // allow methods
  next();
});

var corsOptions = {
  origin: "http://localhost:8081"
};
app.use(cors(corsOptions));
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
// parse requests of content-type
app.use(express.json());

// user routes
const router = require("./app/routes/index");
app.use("/api", router);


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Response OK." });
});   

// set port, listen for requests
const PORT = process.env.PORT ;
app.listen(PORT || 3000, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// if error, send 404 status
app.use((req, res, next) => {
  res.status(404).send("Sorry can't find that!") 
}) 

// custom error handler
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

