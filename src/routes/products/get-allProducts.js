const Products = require("../../db/schemas/product");

const getAllProducts = (request, response) => {
  const sendResponse = product => {
    response.status(200);
    response.json(product);
  };

  Products.find()
    .then(sendResponse)
    .catch(err => {
      console.error(err);
    });
};

module.exports = getAllProducts;
