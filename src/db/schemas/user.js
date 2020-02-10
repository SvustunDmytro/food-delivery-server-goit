const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    username: String,
    telephone: String,
    password: String,
    email: String,
    favoriteProducts: String,
    viewedProducts: String,
    orders: String
  },
  {
    versionKey: false // You should be aware of the outcome after set to false
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;
