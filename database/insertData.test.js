const { client } = require("./client");
const { DB_NAME } = require("./const");

const { insertData } = require("./insertData");

const mockInsertMany = jest.fn();

const mockClient = {
  connect: jest.fn(),
  db: jest.fn().mockReturnValue({
    collection: jest.fn().mockReturnValue({
      insertMany: mockInsertMany,
    }),
  }),
  close: jest.fn(),
};

jest.mock("./client", () => ({
  getClient: () => mockClient,
}));

describe("insertData", () => {
  test("inserts data into database", async () => {
    const mockData = [{ id: 1, name: "Order 1" }];
    mockInsertMany.mockResolvedValueOnce();

    await insertData(mockData);

    expect(mockClient.connect).toHaveBeenCalledTimes(1);

    expect(mockInsertMany).toHaveBeenCalledWith(mockData);

    expect(mockClient.close).toHaveBeenCalledTimes(1);
  });
});
