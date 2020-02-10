const express = require("express");
const mainRoute = require("./main/main");
const getAllUsers = require("./users/get-allUsers");
const getUser = require("./users/get-user");
const createUsers = require("./users/create-users");
const getProduct = require("./products/product");
const getProducts = require("./products/products");
const createOrder = require("./orders/create-order");
const updateUser = require("./users/update-user");

const apiRoutes = express.Router();

apiRoutes
  .get("/", mainRoute)
  .get("/users", getAllUsers)
  .get("/users/:userId", getUser)
  .get("/products/:productId", getProduct)
  .get("/products", getProducts)
  .put("/users/:userId", updateUser)

  .post("/users", createUsers)
  .post("/orders", createOrder)
  .get("*", (req, res, next) => {
    res.status(404).send("Route not exists");
  });

module.exports = apiRoutes;
