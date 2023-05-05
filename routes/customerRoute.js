const express = require("express");
const router = express.Router();
const { fetchData } = require("../database/fetchData");

/**
 * GET customer page.
 */

router.get("/customers", async (req, res) => {
  res.render("customerPage", { customersList: await fetchData("Customers") });
});

module.exports = router;
