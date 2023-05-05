function CSVtoJson(buffdata) {
  let dataJson = [];
  let data = buffdata.split("\n");
  data.forEach((element) => {
    //console.log(element);
    if (!element.includes("orderId")) {
      elementList = element.split(",");
      if (elementList.length >= 4) {
        dataJson.push({
          orderId: elementList[0],
          customerId: elementList[1],
          item: elementList[2],
          quantity: elementList[3],
        });
      }
    }
  });
  //console.log(dataJson);

  return dataJson;
}

module.exports = {
  CSVtoJson,
};
