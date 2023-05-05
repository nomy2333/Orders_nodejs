const { CSVtoJson } = require("./CSVtoJson");

describe("CSVtoJson", () => {
  test("transfer all available string from CSV into json format", () => {
    const testData = "123,321,Flowers,2";
    expect(CSVtoJson(testData)).toStrictEqual([
      { orderId: "123", customerId: "321", item: "Flowers", quantity: "2" },
    ]);
  });

  test("transfer unavailable string from CSV into json format", () => {
    var testData = "orderId,customerId,item,quantity/n";
    expect(CSVtoJson(testData)).toStrictEqual([]);
  });
});
