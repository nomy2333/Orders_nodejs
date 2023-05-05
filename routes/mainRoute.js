var express = require("express");
var router = express.Router();
const path = require("path");
//app.set("views", path.join(__dirname, "views"));

/* GET home page. */
/**
 * GET index main page.
 */

router.get("/", (req, res) => {
  res.render("mainPage");
  //res.sendFile(path.join(__dirname,"mainpage.html"))
});

module.exports = router;
