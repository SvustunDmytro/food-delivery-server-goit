const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema(
  {
    sku: Number,
    name: String,
    description: String,
    price: Number,
    currency: String,
    creatorId: Number,
    created: {
      type: Date,
      default: Date.now
    },
    modified: {
      type: Date,
      default: Date.now
    },
    categories: [String],
    likes: Number
  },
  {
    versionKey: false
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
