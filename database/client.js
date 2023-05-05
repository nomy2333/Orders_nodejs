const { MongoClient } = require("mongodb");

const uri = process.env.uri;

const client = new MongoClient(uri);

function getClient() {
  return client;
}

module.exports = { getClient };
