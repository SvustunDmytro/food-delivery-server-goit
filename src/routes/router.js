const express = require("express");
const mainRoute = require("./main/main");
const getAllUsers = require("./users/get-allUsers");
const getUser = require("./users/get-user");
const getProduct = require("./products/get-productById");
const getAllProducts = require("./products/get-allProducts");
const getOrder = require("./orders/get-orderById");
const createUser = require("./users/create-user");
const createProduct = require("./products/create-product");
const createOrder = require("./orders/create-order");
const updateUser = require("./users/update-user");
const updateProduct = require("./products/update-product");

const apiRoutes = express.Router();

apiRoutes
  .get("/", mainRoute)
  .get("/users", getAllUsers)
  .get("/users/:userId", getUser)
  .get("/products", getAllProducts)
  .get("/products/:productId", getProduct)
  .get("/orders/:orderId", getOrder)
  .put("/products/:productId", updateProduct)
  .put("/users/:userId", updateUser)

  .post("/users", createUser)
  .post("/products", createProduct)
  .post("/orders", createOrder)
  .get("*", (req, res, next) => {
    res.status(404).send("Route not exists");
  });

module.exports = apiRoutes;
