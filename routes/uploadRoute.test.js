const { processUploadFiles } = require("./uploadRoute");

// mock dependencies
jest.mock("../functions/CSVtoJson", () => ({
  CSVtoJson: jest.fn(() => []),
}));

jest.mock("../functions/filterOrders", () => ({
  filterOrders: jest.fn(() => []),
}));

jest.mock("../database/insertData", () => ({
  insertData: jest.fn(),
}));

describe("processUploadFiles", () => {
  let req, res;

  beforeEach(() => {
    req = {
      files: {
        uploadFile: {
          data: Buffer.from("id,name,quantity\n1,Product A,5"),
          name: "test.csv",
          mv: jest.fn(),
        },
      },
    };
    res = {
      status: jest.fn(() => res),
      send: jest.fn(),
    };
  });

  it("returns 400 if no files were uploaded", async () => {
    req.files = undefined;
    await processUploadFiles(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.send).toHaveBeenCalledWith("No files were uploaded.");
  });

  it("stores the uploaded file as a hard copy", async () => {
    await processUploadFiles(req, res);
    expect(req.files.uploadFile.mv).toHaveBeenCalledWith(
      `${__dirname}/store/test.csv`,
      expect.any(Function)
    );
  });

  it("sends a success response", async () => {
    await processUploadFiles(req, res);
    expect(res.send).toHaveBeenCalledWith(
      "<p>upload successfully, click <a href='/orders'>here</a> to check order list</p>"
    );
  });
});
