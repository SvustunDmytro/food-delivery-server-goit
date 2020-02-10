const Product = require("../../db/schemas/product");

const getProduct = (request, response) => {
  const id = request.params.productId;

  const sendResponse = product => {
    response.status(200);
    response.json(product);
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "product was not found"
    });
  };

  const findProduct = Product.findById(id);

  findProduct.then(sendResponse).catch(sendError);
};

module.exports = getProduct;
