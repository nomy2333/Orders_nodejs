var express = require("express");
var router = express.Router();
var customers = require("../database/fetchData");

/**
 * GET customer page.
 */

router.get("/customers", async (req, res) => {
  res.render("customerPage", { customersList: await customers("Customers") });
});

module.exports = router;
