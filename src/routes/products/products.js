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
  const suchResult = ids.map(function(item) {
    const idNumber = +item;
    const result = parsedProducts.find(item => item.id === idNumber);
    if (result) return result;
  });

  const filterArrProducts = suchResult.filter(function(item) {
    if (item) {
      return item;
    }
  });

  let responseStatus;

  if (filterArrProducts.length === 0) {
    responseStatus = {
      status: "no products",
      products: []
    };
  } else {
    responseStatus = {
      status: "success",
      products: suchResult
    };
  }

  response.set("Content-Type", "application/json");

  response.status(200);
  response.json(responseStatus);
};

module.exports = getProducts;
