const fs = require("fs");
const path = require("path");
const util = require("util");

const productsFolder = path.resolve(
  __dirname,
  "../../",
  "db/products/all-products.json"
);
const usersFolder = path.resolve(__dirname, "../../", "db/users/orders");
const allProducts = fs.readFileSync(productsFolder, "utf8", (err, data) => {
  if (err) throw err;
  return data;
});

const parsedProducts = JSON.parse(allProducts);
const writeFile = util.promisify(fs.writeFile);

const saveNewOrder = (fileName, data) => {
  const src = path.resolve(usersFolder, fileName + ".json");
  console.log(src);
  const dataStr = JSON.stringify(data);

  return writeFile(src, dataStr);
};

const createOrder = (request, response) => {
  const order = request.body;
  const suchResult = order.products.map(function(item) {
    const idNumber = +item;
    const result = parsedProducts.find(item => item.id === idNumber);
    if (!result) {
      return `${idNumber} не найден`;
    }
    return idNumber;
  });
  const orderData = { ...order, id: Date.now() };
  orderData.products = suchResult;

  const fileName = `${orderData.id}`;
  console.log(productsFolder);

  const sendResponse = () => {
    response.json({
      status: "success",
      order: orderData
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "user was not saved"
    });
  };

  saveNewOrder(fileName, orderData)
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createOrder;
