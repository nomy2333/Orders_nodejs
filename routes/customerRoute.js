var express = require("express");
var router = express.Router();
var customers = require("../database/dataFetch");
/* GET home page. */
/**
 * GET customer page.
 */

router.get("/customers", async (req, res) => {
  // Fetch data from database
  res.render("customerPage", { customersList: await customers("Customers") });
});

module.exports = router;
