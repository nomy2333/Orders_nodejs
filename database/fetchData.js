const { MongoClient } = require("mongodb");
require("dotenv").config();
let uri = process.env.uri;

const client = new MongoClient(uri);
async function fetchData(collectionName) {
  await client.connect();
  const database = client.db("TyroHealth");
  const ratings = database.collection(collectionName);
  const cursor = await ratings.find({}).limit(10).toArray();
  return cursor;
}
module.exports = fetchData;
