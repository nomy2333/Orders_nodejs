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
 * route area
 */

//get:main route page
const mainRoute = require("./routes/mainRoute");
app.use("/", mainRoute);

//get:order route page
const orderRoute = require("./routes/orderRoute");
app.use("/", orderRoute);

//get:customer route page
const customerRoute = require("./routes/customerRoute");
app.use("/", customerRoute);

//post:add orders from upload files
const fileUpload = require("express-fileupload");
app.use(fileUpload());
const uploadRoute=require("./routes/uploadRoute");
app.use("/",uploadRoute)

module.exports = app;
