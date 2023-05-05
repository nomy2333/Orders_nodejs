const { getClient } = require("./client");
const { DB_NAME } = require("./const");

async function fetchData(collectionName) {
  const client = getClient();
  await client.connect();

  const database = client.db(DB_NAME);
  const data = database.collection(collectionName);

  const cursor = await data.find({}).toArray();
  return cursor;
}

module.exports = { fetchData };
