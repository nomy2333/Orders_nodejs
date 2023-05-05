const express = require("express");
const app = express();
const port = 3001;

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
const path = require("path");
// config and  middleware
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


/**
 * database area
 */
require("dotenv").config();
const { MongoClient } = require("mongodb");
let uri = process.env.uri;
const client = new MongoClient(uri);

/**
 * route area
 */

//get:main route page
var mainRoute = require("./routes/mainRoute");
app.use("/", mainRoute);

//get:order route page
var orderRoute = require("./routes/orderRoute");
app.use("/", orderRoute);

//get:customer route page
var customerRoute = require("./routes/customerRoute");
app.use("/", customerRoute);




