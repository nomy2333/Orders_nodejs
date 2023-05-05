//test.js
const server = require("./index");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);
const path = require("path");

const express = require("express");
const app = (module.exports = express());

//test function CSVtoJSON()
var CSVtoJSON = require("./functions/CSVtoJson");
test("transfer all available string from CSV into json format", () => {
  var testData = "123,321,Flowers,2";
  expect(CSVtoJSON(testData)).toStrictEqual([
    { orderId: "123", customerId: "321", item: "Flowers", quantity: "2" },
  ]);
});

test("transfer unavailable string from CSV into json format", () => {
  var testData = "orderId,customerId,item,quantity/n";
  expect(CSVtoJSON(testData)).toStrictEqual([]);
});

//test the path main route
var mainRoute = require("./routes/mainRoute");
app.use("/", mainRoute);
describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    let res = await supertest(server).get("/");
    expect(res.statusCode).toEqual(200);
  });
});

//test the path orders route
var orderRoute = require("./routes/orderRoute");
app.use("/", orderRoute);
describe("Test the order path", () => {
  test("It should response the GET method", async () => {
    let res = await supertest(server).get("/orders");
    expect(res.statusCode).toEqual(200);
  });
});

//test the path customers route
var customerRoute = require("./routes/customerRoute");
app.use("/", customerRoute);
describe("Test the customer path", () => {
  test("It should response the GET method", async () => {
    let res = await supertest(server).get("/customers");
    expect(res.statusCode).toEqual(200);
  });
});

//test the mongodb database connection and insert correctly
const { MongoClient } = require("mongodb");
require("dotenv").config();
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
