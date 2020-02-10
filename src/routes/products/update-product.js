const Product = require("../../db/schemas/product");

const updateProduct = (request, response) => {
  const product = request.body;
  const id = request.params.productId;
  const modifiedProduct = { ...product, modified: Date.now() };

  const sendError = () => {
    response.status(400);
    response.json({
      status: "error",
      text: "there is no such product"
    });
  };

  const sendResponse = newProduct => {
    if (!newProduct) {
      return sendError();
    }

    response.json({
      status: "success",
      product: newProduct
    });
  };

  Product.findOneAndUpdate({ _id: id }, modifiedProduct, { new: true })
    .then(sendResponse)
    .catch(sendError);
};

module.exports = updateProduct;
