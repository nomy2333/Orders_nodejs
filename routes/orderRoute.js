var express = require("express");
var router = express.Router();
var orders = require("../database/fetchData");

/**
 * GET order page.
 */

router.get("/orders", async (req, res) => {
  res.render("orderPage", { ordersList: await orders("Orders") });
});

module.exports = router;
