const path = require("path");
const fs = require("fs");

const productsFolder = path.resolve(
  __dirname,
  "../../",
  "db/products/all-products.json"
);
const allProducts = fs.readFileSync(productsFolder, "utf8", (err, data) => {
  if (err) throw err;
  return data;
});
const parsedProducts = JSON.parse(allProducts);

const getProducts = (request, response) => {
  const ids = request.query.ids.split(",");
  const statusSuccess = {
    status: "success",
    products: []
  };
  const suchResult = ids.map(function(item) {
    const idNumber = +item;
    const result = parsedProducts.find(item => item.id === idNumber);
    if (!result) {
      return `${idNumber} не найден`;
    }
    return result;
  });
  statusSuccess.products.push(suchResult);

  response.set("Content-Type", "application/json");

  response.status(200);
  response.json({ user: statusSuccess });
};

module.exports = getProducts;
