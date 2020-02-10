const Order = require("../../db/schemas/order");

const getOrder = (request, response) => {
  const id = request.params.orderId;

  const sendResponse = order => {
    response.status(200);
    response.json(order);
  };

  const sendError = () => {
    response.status(400);
    response.json({
      error: "order was not found"
    });
  };

  const findOrder = Order.findById(id);

  findOrder.then(sendResponse).catch(sendError);
};

module.exports = getOrder;
