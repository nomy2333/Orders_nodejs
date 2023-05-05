var express = require("express");
var router = express.Router();
const path = require("path");

/**
 * GET index main page.
 */

router.get("/", (req, res) => {
  res.render("mainPage");
});

module.exports = router;
