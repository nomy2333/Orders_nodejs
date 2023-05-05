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

//post:add orders from upload files
const fileUpload = require("express-fileupload");
app.use(fileUpload());
/**
 * function area
 */
var CSVtoJson = require("./functions/CSVtoJson");
app.post("/upload", function (req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }
  const file = req.files.uploadFile;
  const filename = file.name;
  //step 1.store the upload files as hard copy
  file.mv(`${__dirname}/store/${filename}`, (err) => {
    if (err) {
      console.log(err);
      res.send("store error");
    }
  });
  //step 2: transfer file data as Json
  var dataJson = CSVtoJson(file.data.toString("utf8"));
  let dataAvailable = [];
  //step 3: connect the database, first check the customerID exists, then push into database
  client.connect();
  const database = client.db("TyroHealth");
  const customerCollection = database.collection("Customers");
  const orderCollection = database.collection("Orders");
  console.log("Connected correctly to server");
  try {
    dataJson.forEach((item) => {
      const myDoc = customerCollection.find({ customerId: item.customerId });
      if (myDoc) {
        if (dataAvailable.length > 10) {
          orderCollection.insertMany(dataAvailable);
          dataAvailable = [];
        }
        dataAvailable.push(item);
      }
    });
  } finally {
    console.log("insert into database");

    orderCollection.insertMany(dataAvailable);
    client.close();
  }

  res.send(
    "<p>upload successfully, click <a href='/orders'>here</a> to check order list</p>"
  );
});

module.exports = app;



