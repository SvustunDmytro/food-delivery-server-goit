const fs = require("fs");
const path = require("path");
const util = require("util");

const productsFolder = path.resolve(
  __dirname,
  "../../",
  "db/products/all-products.json"
);
const ordersFolder = path.resolve(__dirname, "../../", "db/users/orders");
const allProducts = fs.readFileSync(productsFolder, "utf8", (err, data) => {
  if (err) throw err;
  return data;
});

const parsedProducts = JSON.parse(allProducts);
const writeFile = util.promisify(fs.writeFile);

const saveNewOrder = (fileName, data) => {
  const src = path.resolve(ordersFolder, fileName + ".json");
  const dataStr = JSON.stringify(data);

  return writeFile(src, dataStr);
};

const createOrder = (request, response) => {
  const order = request.body;
  const suchResult = order.products.map(function(item) {
    const idNumber = +item;
    const result = parsedProducts.find(item => item.id === idNumber);
    if (result) return idNumber;
  });
  const orderData = { ...order, id: Date.now() };
  orderData.products = suchResult;
  const filterArrId = suchResult.filter(function(item) {
    if (item) {
      return item;
    }
  });

  let responseStatus;

  if (filterArrId.length === 0) {
    responseStatus = {
      status: "failed",
      order: null
    };
  } else {
    responseStatus = {
      status: "success",
      order: orderData
    };
  }

  const fileName = `${orderData.id}`;

  const sendResponse = () => {
    response.json(responseStatus);
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "order was not saved"
    });
  };

  saveNewOrder(fileName, orderData)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createOrder;
