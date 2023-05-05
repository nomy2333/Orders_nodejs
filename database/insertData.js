const { getClient } = require("./client");
const { DB_NAME } = require("./const");

async function insertData(dataArray) {
  const client = getClient();
  await client.connect();

  try {
    const database = client.db(DB_NAME);
    const orderCollection = database.collection("Orders");

    console.log("insert into database");
    await orderCollection.insertMany(dataArray);
  } finally {
    client.close();
  }
}

module.exports = { insertData };
