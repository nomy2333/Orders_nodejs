const express = require("express");
const router = express.Router();

const { CSVtoJson } = require("../functions/CSVtoJson");
const { filterOrders } = require("../functions/filterOrders");
const { insertData } = require("../database/insertData");

async function processUploadFiles(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send("No files were uploaded.");
  }

  const file = req.files.uploadFile;
  const filename = file.name;

  //step 1.store the upload files as hard copy
  file.mv(`${__dirname}/store/${filename}`, (err) => {
    if (err) {
      console.log(err);
      res.send("store error");
    }
  });

  //step 2: transfer file data as Json, and filter orders
  const dataJson = CSVtoJson(file.data.toString("utf8"));
  const filteredOrders = await filterOrders(dataJson);

  //step 3: connect the database, first check the customerID exists, then push into database
  await insertData(filteredOrders);

  res.send(
    "<p>upload successfully, click <a href='/orders'>here</a> to check order list</p>"
  );
}

/**
 * POST Upload files.
 */
router.post("/upload", processUploadFiles);

module.exports = {
  processUploadFiles,
  uploadRoute: router,
};
