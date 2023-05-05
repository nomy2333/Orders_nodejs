const express = require("express");
const router = express.Router();
const { fetchData } = require("../database/fetchData");

/**
 * GET order page.
 */

router.get("/orders", async (req, res) => {
  res.render("orderPage", { ordersList: await fetchData("Orders") });
});

module.exports = router;
