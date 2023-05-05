var express = require("express");
var router = express.Router();

var CSVtoJson = require("../functions/CSVtoJson");
var insertData = require("../database/insertData");
/**
 * POST Upload files.
 */
router.post("/upload", async function (req, res) {
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
  //step 2: transfer file data as Json
  var dataJson = CSVtoJson(file.data.toString("utf8"));
  //step 3: connect the database, first check the customerID exists, then push into database
  await insertData(dataJson);
  res.send(
    "<p>upload successfully, click <a href='/orders'>here</a> to check order list</p>"
  );
});

module.exports = router;
