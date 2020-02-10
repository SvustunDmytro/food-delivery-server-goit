const Product = require("../../db/schemas/product");

const createProduct = (request, response) => {
  const product = request.body;

  const newProduct = new Product(product);

  const sendResponse = product => {
    response.json({
      status: "success",
      product
    });
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "user was not saved"
    });
  };

  newProduct
    .save()
    .then(sendResponse)
    .catch(sendError);
};

module.exports = createProduct;
