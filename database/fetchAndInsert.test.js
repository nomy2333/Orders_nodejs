const { MongoClient } = require("mongodb");

let uri = process.env.uri;
const client = new MongoClient(uri);

describe("connect and insert", () => {
  let connection;
  let database;
  beforeAll(async () => {
    connection = await client.connect();
    database = await connection.db("TyroHealth");
  });
  afterAll(async () => {
    await client.close();
  });
  it("should insert a doc into orders collection", async () => {
    const orderCollection = database.collection("Orders");
    const mockOrder = {
      _id: "test_id",
      customerId: "123",
      item: "sugar",
      quantity: "100",
      orderId: "778",
    };

    await orderCollection.insertOne(mockOrder);
    const insertedOrder = await orderCollection.findOne({ _id: "test_id" });

    expect(insertedOrder).toEqual(mockOrder);

    await orderCollection.deleteOne(mockOrder);
  });
});
