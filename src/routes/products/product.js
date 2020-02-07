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

const getProduct = (request, response) => {
  const id = request.params.productId;
  const searchResult = parsedProducts.find(item => item.id === Number(id));

  response.set("Content-Type", "application/json");

  response.status(200);
  response.json({ user: searchResult });
};

module.exports = getProduct;
