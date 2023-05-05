//test.js
const server = require("../index");
const supertest = require("supertest");
const requestWithSupertest = supertest(server);
const path = require("path");

const express = require("express");
const app = (module.exports = express());

//test the path main route
const mainRoute = require("./mainRoute");
app.use("/", mainRoute);
describe("Test the root path", () => {
  test("It should response the GET method", async () => {
    let res = await supertest(server).get("/");
    expect(res.statusCode).toEqual(200);
  });
});

//test the path orders route
const orderRoute = require("./orderRoute");
app.use("/", orderRoute);
describe("Test the order path", () => {
  test("It should response the GET method", async () => {
    let res = await supertest(server).get("/orders");
    expect(res.statusCode).toEqual(200);
  });
});

//test the path customers route
const customerRoute = require("./customerRoute");
app.use("/", customerRoute);
describe("Test the customer path", () => {
  test("It should response the GET method", async () => {
    let res = await supertest(server).get("/customers");
    expect(res.statusCode).toEqual(200);
  });
});
