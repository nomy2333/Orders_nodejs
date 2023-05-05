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





