const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    creator: String,
    productsList: [{ product: [Number], type: String, itemsCount: Number }],
    deliveryType: String,
    deliveryAddress: String,
    sumToPay: Number,
    status: String
  },
  {
    versionKey: false
  }
);

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
