var express = require("express");
var router = express.Router();
var orders = require("../database/dataFetch");

/**
 * GET order page.
 */

router.get("/orders", async(req, res) => {
  res.render("orderPage",{ ordersList: await orders("Orders") });
});

module.exports = router;
