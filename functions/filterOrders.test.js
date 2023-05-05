const { fetchData } = require("../database/fetchData");
const { filterOrders } = require("./filterOrders");

jest.mock("../database/fetchData", () => ({
  fetchData: jest.fn(),
}));

describe("filter orders", () => {
  fetchData.mockResolvedValue([
    {
      customerId: "a",
    },
    {
      customerId: "b",
    },
  ]);

  test("return filtered orders", async () => {
    const results = await filterOrders([
      {
        customerId: "a",
        orderId: "1",
      },
      {
        customerId: "c",
        orderId: "2",
      },
      {
        customerId: "b",
        orderId: "3",
      },
    ]);

    expect(results).toEqual([
      {
        customerId: "a",
        orderId: "1",
      },
      {
        customerId: "b",
        orderId: "3",
      },
    ]);
  });
});
