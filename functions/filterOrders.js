const { fetchData } = require("../database/fetchData");

async function filterOrders(dataJson) {
  const customers = await fetchData("Customers");
  const customersMap = customers.reduce((prev, c) => {
    prev[c.customerId] = c;
    return prev;
  }, {});

  const dataAvailable = [];

  dataJson.forEach((item) => {
    if (customersMap[item.customerId]) {
      dataAvailable.push(item);
    }
  });

  console.log("insert into database");

  return dataAvailable;
}

module.exports = { filterOrders };
