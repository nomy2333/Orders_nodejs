const { MongoClient } = require("mongodb");
require("dotenv").config();
let uri = process.env.uri;

const client = new MongoClient(uri);
async function insertData(dataJson) {
  await client.connect();
  const database = client.db("TyroHealth");
  const customerCollection = database.collection("Customers");
  const orderCollection = database.collection("Orders");
  let dataAvailable = [];
  //   try {
  dataJson.forEach((item) => {
    const myDoc = customerCollection.find({ customerId: item.customerId });
    if (myDoc) {
      if (dataAvailable.length > 10) {
        orderCollection.insertMany(dataAvailable);
        dataAvailable = [];
      }
      dataAvailable.push(item);
    }
  });
  //   } finally {
  console.log("insert into database");
  await orderCollection.insertMany(dataAvailable);
  client.close();
  //   }
}
module.exports = insertData;
